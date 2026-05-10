package com.dfs.exception;

import com.dfs.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.context.request.WebRequest;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(
            MethodArgumentNotValidException ex,
            WebRequest request) {
        String errorDetail = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining(", "));
        String path = request.getDescription(false).replace("uri=", "");
        ApiResponse<Void> body = ApiResponse.error(
                "Validation failed",
                path,
                errorDetail);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler({ RestClientException.class, ResourceAccessException.class })
    public ResponseEntity<ApiResponse<Void>> handleMlApiError(
            Exception ex,
            WebRequest request) {
        String details = ex.getMessage() != null ? ex.getMessage() : ex.getClass().getSimpleName();
        String path = request.getDescription(false).replace("uri=", "");
        ApiResponse<Void> body = ApiResponse.error(
                "ML service error",
                path,
                "Upstream service unavailable or error",
                details);
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleOther(
            Exception ex,
            WebRequest request) {
        String path = request.getDescription(false).replace("uri=", "");
        ApiResponse<Void> body = ApiResponse.error(
                "Internal server error",
                path,
                "An unexpected error occurred");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
