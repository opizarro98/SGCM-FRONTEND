package com.ec.sgcm.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class) // Captura cualquier excepción
    public ResponseEntity<ApiErrorResponse> handleAllExceptions(Exception ex, WebRequest request) {
        // Obtén el endpoint que causó el error
        String endpoint = request.getDescription(false).replace("uri=", "");

        // Crea el objeto de error con el mensaje y el código de estado HTTP
        ApiErrorResponse errorResponse = new ApiErrorResponse(
                endpoint,
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value());

        // Devuelve el error con el estado HTTP 500
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Puedes añadir más métodos para manejar excepciones específicas
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex,
            WebRequest request) {
        String endpoint = request.getDescription(false).replace("uri=", "");
        ApiErrorResponse errorResponse = new ApiErrorResponse(
                endpoint,
                ex.getMessage(),
                HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

}