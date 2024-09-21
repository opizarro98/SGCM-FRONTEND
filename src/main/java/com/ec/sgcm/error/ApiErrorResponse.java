package com.ec.sgcm.error;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ApiErrorResponse {

    private String endpoint;
    private String message;
    private LocalDateTime timestamp;
    private int statusCode;

    // Constructor
    public ApiErrorResponse(String endpoint, String message, int statusCode) {
        this.endpoint = endpoint;
        this.message = message;
        this.timestamp = LocalDateTime.now();
        this.statusCode = statusCode;
    }
}
