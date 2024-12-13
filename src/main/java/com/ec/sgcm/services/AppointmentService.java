package com.ec.sgcm.services;

import java.util.List;

import com.ec.sgcm.model.Appointments;
import com.ec.sgcm.model.dto.AppointmentDTO;

public interface AppointmentService {

    Appointments createAppointment(Appointments appointment);

    Appointments canceledAppointment(Long idAppointment);

    Appointments updateAppointment(Appointments appointment);

    List<AppointmentDTO> getAllAppointments();

    Appointments getAppointmentById(Long id);

    void deleteAppointment(Long id);
}
