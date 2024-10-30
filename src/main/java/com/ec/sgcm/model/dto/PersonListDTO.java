package com.ec.sgcm.model.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonListDTO {

    String identification;
    String fullName;
    LocalDate birth_date;
    String occupancy;

}
