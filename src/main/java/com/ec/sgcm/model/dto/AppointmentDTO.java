package com.ec.sgcm.model.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentDTO {
    Long id;
    String identification;
    String patientname;
    LocalDate date;
    LocalTime hour;
    String reason;
    boolean isAttended;
}
