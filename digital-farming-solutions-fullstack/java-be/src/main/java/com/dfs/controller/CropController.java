package com.dfs.controller;

import com.dfs.dto.ApiResponse;
import com.dfs.service.CropService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CropController {

    private final CropService cropService;

    public CropController(CropService cropService) {
        this.cropService = cropService;
    }

    @GetMapping("/crops")
    public ResponseEntity<ApiResponse<List<String>>> crops() {
        return ResponseEntity.ok(ApiResponse.success(cropService.getCrops()));
    }
}
