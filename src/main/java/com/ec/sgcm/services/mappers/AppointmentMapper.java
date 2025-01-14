package com.ec.sgcm.services.mappers;

import com.ec.sgcm.model.Appointments;
import com.ec.sgcm.model.dto.AppointmentDTO;

public class AppointmentMapper {
    public static AppointmentDTO toDTO(Appointments appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setIdentification(appointment.getPerson().getIdentification());
        dto.setPatientname(appointment.getPerson().getFirstName() + " " + appointment.getPerson().getLastName());
        dto.setDate(appointment.getDate());
        dto.setHour(appointment.getHour());
        dto.setReason(appointment.getReason());
        dto.setAttended(appointment.isAttended());
        return dto;
    }
}