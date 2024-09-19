package com.ec.sgcm.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.Appointment;
import com.ec.sgcm.repository.AppointmentRepo;
import com.ec.sgcm.services.AppointmentService;

@Service
public class AppointmentServiceImp implements AppointmentService {

    @Autowired
    AppointmentRepo appointmentRepo;

    @Override
    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepo.save(appointment);
    }

}
