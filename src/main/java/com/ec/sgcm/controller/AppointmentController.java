package com.ec.sgcm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.error.ApiErrorResponse;
import com.ec.sgcm.model.Appointments;
import com.ec.sgcm.model.dto.AppointmentDTO;
import com.ec.sgcm.services.AppointmentService;

@RestController
@RequestMapping("/appointmentRest")
@CrossOrigin(origins = { "*" })
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Crear una nueva cita
    @PostMapping("/createNewAppointment")
    @ResponseBody
    public ResponseEntity<?> createNewAppointment(@RequestBody Appointments appointment) {
        try {
            Appointments newAppointment = appointmentService.createAppointment(appointment);
            return ResponseEntity.ok().body(newAppointment);
        } catch (IllegalArgumentException ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/createNewAppointment",
                    ex.getMessage(), HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/createNewAppointment",
                    "Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Cancelar una cita
    @PutMapping("/canceledAppointment/{idAppointment}")
    @ResponseBody
    public ResponseEntity<?> canceledAppointment(@PathVariable Long idAppointment) {
        try {
            Appointments newAppointment = appointmentService.canceledAppointment(idAppointment);
            return ResponseEntity.ok().body(newAppointment);
        } catch (IllegalArgumentException ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/canceledAppointment",
                    ex.getMessage(), HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/canceledAppointment",
                    "Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Cancelar una cita
    @PutMapping("/attendedAppointment/{idAppointment}")
    @ResponseBody
    public ResponseEntity<?> attendedAppointment(@PathVariable Long idAppointment) {
        try {
            Appointments newAppointment = appointmentService.attendedAppointment(idAppointment);
            return ResponseEntity.ok().body(newAppointment);
        } catch (IllegalArgumentException ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/canceledAppointment",
                    ex.getMessage(), HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/canceledAppointment",
                    "Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Actualizar una cita existente
    @PutMapping("/updateAppointment")
    @ResponseBody
    public ResponseEntity<?> updateAppointment(@RequestBody Appointments appointment) {
        try {
            Appointments updatedAppointment = appointmentService.updateAppointment(appointment);
            return ResponseEntity.ok().body(updatedAppointment);
        } catch (IllegalArgumentException ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/updateAppointment", ex.getMessage(),
                    HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/updateAppointment",
                    "Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Obtener todas las citas
    @GetMapping("/getAllAppointments")
    @ResponseBody
    public ResponseEntity<?> getAllAppointments() {
        try {
            List<AppointmentDTO> appointmentsList = appointmentService.getAllAppointments();
            return ResponseEntity.ok().body(appointmentsList);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/getAllAppointments",
                    "Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Obtener una cita por su ID
    @GetMapping("/getAppointmentById/{id}")
    @ResponseBody
    public ResponseEntity<?> getAppointmentById(@PathVariable Long id) {
        try {
            Appointments appointment = appointmentService.getAppointmentById(id);
            return ResponseEntity.ok().body(appointment);
        } catch (IllegalArgumentException ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/getAppointmentById",
                    ex.getMessage(), HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/getAppointmentById",
                    "Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Eliminar una cita por su ID
    @DeleteMapping("/deleteAppointment/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok().body("Cita eliminada correctamente.");
        } catch (IllegalArgumentException ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/deleteAppointment", ex.getMessage(),
                    HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/appointmentRest/deleteAppointment",
                    "Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}