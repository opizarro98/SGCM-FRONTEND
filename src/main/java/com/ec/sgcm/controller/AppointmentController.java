package com.ec.sgcm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.model.Appointment;
import com.ec.sgcm.services.AppointmentService;

@RestController
@RequestMapping("/appointmentRest")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @CrossOrigin(origins = "*")
    @PostMapping("/createNewAppointment")
    @ResponseBody
    public ResponseEntity<Appointment> createNewAppointment(@RequestBody Appointment appointment) {
        return ResponseEntity.ok().body(appointmentService.createAppointment(appointment));
    }
}
