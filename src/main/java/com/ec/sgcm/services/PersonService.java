package com.ec.sgcm.services;

import java.util.List;
import com.ec.sgcm.model.Persons;

public interface PersonService {

    Persons createNewPerson(Persons person);

    Persons updateNewPerson(Persons person);

    List<Persons> searchAllPerson();

    Persons searchPersonByIdentification(String identification);

}
