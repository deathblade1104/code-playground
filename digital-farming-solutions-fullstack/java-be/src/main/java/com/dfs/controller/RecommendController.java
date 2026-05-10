package com.dfs.controller;

import com.dfs.dto.RecommendRequest;
import com.dfs.dto.RecommendResponse;
import com.dfs.dto.ApiResponse;
import com.dfs.service.MlApiService;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RecommendController {

    private final MlApiService mlApiService;

    public RecommendController(MlApiService mlApiService) {
        this.mlApiService = mlApiService;
    }

    @PostMapping("/recommend")
    public ResponseEntity<ApiResponse<RecommendResponse>> recommend(
            @Valid @RequestBody RecommendRequest request) {
        RecommendResponse response = mlApiService.recommend(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
