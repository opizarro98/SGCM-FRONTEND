package com.ec.sgcm.services.mappers;

import com.ec.sgcm.model.Appointments;
import com.ec.sgcm.model.dto.AppointmentDTO;

public class AppointmentMapper {
    public static AppointmentDTO toDTO(Appointments appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setPatientname(appointment.getPerson().getFirst_name() + " " + appointment.getPerson().getLast_name());
        dto.setDate(appointment.getDate());
        dto.setHour(appointment.getHour());
        dto.setDescription(appointment.getDescription());
        return dto;
    }
}