package com.ec.sgcm.services;

import java.util.List;

import com.ec.sgcm.model.Appointments;

public interface AppointmentService {

    Appointments createAppointment(Appointments appointment);

    Appointments updateAppointment(Appointments appointment);

    List<Appointments> getAllAppointments();

    Appointments getAppointmentById(Long id);

    void deleteAppointment(Long id);
}
