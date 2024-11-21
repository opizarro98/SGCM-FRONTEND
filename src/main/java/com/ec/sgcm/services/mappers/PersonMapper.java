package com.ec.sgcm.services.mappers;

import com.ec.sgcm.model.Persons;
import com.ec.sgcm.model.dto.PersonListDTO;

public class PersonMapper {
    public static PersonListDTO toDTO(Persons person) {
        PersonListDTO dto = new PersonListDTO();
        dto.setIdentification(person.getIdentification());
        dto.setFullName(person.getFirstName() + ' ' + person.getLastName());
        dto.setBirth_date(person.getBirthDate());
        dto.setOccupancy(person.getOccupancy());
        return dto;
    }
}
