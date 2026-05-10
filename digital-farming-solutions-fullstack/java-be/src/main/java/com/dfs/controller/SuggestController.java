package com.dfs.controller;

import com.dfs.dto.SuggestResponse;
import com.dfs.dto.ApiResponse;
import com.dfs.service.MlApiService;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SuggestController {

    private final MlApiService mlApiService;

    public SuggestController(MlApiService mlApiService) {
        this.mlApiService = mlApiService;
    }

    @PostMapping("/suggest")
    public ResponseEntity<ApiResponse<SuggestResponse>> suggest(@RequestBody Map<String, Object> body) {
        SuggestResponse response = mlApiService.suggest(body);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
