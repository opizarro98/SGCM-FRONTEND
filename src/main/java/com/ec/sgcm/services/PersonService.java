package com.ec.sgcm.services;

import java.util.List;
import com.ec.sgcm.model.Persons;
import com.ec.sgcm.model.dto.PersonListDTO;

public interface PersonService {

    Persons createNewPerson(Persons person);

    Persons updateNewPerson(Persons person);

    List<PersonListDTO> searchAllPerson();

    Persons searchPersonByIdentification(String identification);

}
