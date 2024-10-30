package com.ec.sgcm.services.mappers;

import com.ec.sgcm.model.Persons;
import com.ec.sgcm.model.dto.PersonListDTO;

public class PersonMapper {
    public static PersonListDTO toDTO(Persons person) {
        PersonListDTO dto = new PersonListDTO();
        dto.setIdentification(person.getIdentification());
        dto.setFullName(person.getFirst_name() + ' ' + person.getLast_name());
        dto.setBirth_date(person.getBirth_date());
        dto.setOccupancy(person.getOccupancy());
        return dto;
    }
}
