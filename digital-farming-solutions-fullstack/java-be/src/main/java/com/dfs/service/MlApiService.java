package com.dfs.service;

import com.dfs.dto.RecommendRequest;
import com.dfs.dto.RecommendResponse;
import com.dfs.dto.SuggestResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class MlApiService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String cropRecommendUrl;
    private final String suggestUrl;

    public MlApiService(@Value("${app.ml-api.base-url:https://dfs-mlapi.onrender.com}") String baseUrl) {
        this.cropRecommendUrl = baseUrl + "/api/croprecommend";
        this.suggestUrl = baseUrl + "/api/suggest";
    }

    public RecommendResponse recommend(RecommendRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("N", request.getN());
        body.put("P", request.getP());
        body.put("K", request.getK());
        body.put("temperature", request.getTemperature());
        body.put("humidity", request.getHumidity());
        body.put("ph", request.getPh());
        body.put("rainfall", request.getRainfall());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        @SuppressWarnings("unchecked")
        Map<String, Object> response = restTemplate.postForObject(
                cropRecommendUrl,
                new HttpEntity<>(body, headers),
                Map.class);
        String payload = response != null && response.containsKey("payload")
                ? String.valueOf(response.get("payload"))
                : "";
        return new RecommendResponse(payload.toUpperCase());
    }

    public SuggestResponse suggest(Map<String, Object> body) {
        Map<String, Object> mlBody = new HashMap<>(body);
        if (mlBody.containsKey("Crop") && mlBody.get("Crop") != null) {
            mlBody.put("Crop", String.valueOf(mlBody.get("Crop")).toLowerCase());
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        @SuppressWarnings("unchecked")
        Map<String, Object> response = restTemplate.postForObject(
                suggestUrl,
                new HttpEntity<>(mlBody, headers),
                Map.class);
        String payload = response != null && response.containsKey("payload")
                ? String.valueOf(response.get("payload"))
                : "";
        return new SuggestResponse(payload.toUpperCase());
    }
}
