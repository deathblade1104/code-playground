package com.dfs.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RecommendRequest {

    @NotNull(message = "Nitrogen is required")
    @DecimalMin(value = "0", message = "Nitrogen must be at least 0")
    @DecimalMax(value = "140", message = "Nitrogen must be at most 140")
    @JsonProperty("N")
    private Double N;

    @NotNull(message = "Phosphorous is required")
    @DecimalMin(value = "5", message = "Phosphorous must be at least 5")
    @DecimalMax(value = "145", message = "Phosphorous must be at most 145")
    @JsonProperty("P")
    private Double P;

    @NotNull(message = "Potassium is required")
    @DecimalMin(value = "5", message = "Potassium must be at least 5")
    @DecimalMax(value = "205", message = "Potassium must be at most 205")
    @JsonProperty("K")
    private Double K;

    @NotNull(message = "Temperature is required")
    private Double temperature;

    @NotNull(message = "Humidity is required")
    @DecimalMin(value = "0", message = "Humidity must be at least 0")
    @DecimalMax(value = "100", message = "Humidity must be at most 100")
    private Double humidity;

    @NotNull(message = "pH is required")
    @DecimalMin(value = "0", message = "pH must be at least 0")
    @DecimalMax(value = "14", message = "pH must be at most 14")
    private Double ph;

    @NotNull(message = "Rainfall is required")
    @DecimalMin(value = "0", message = "Rainfall must be non-negative")
    private Double rainfall;
}
