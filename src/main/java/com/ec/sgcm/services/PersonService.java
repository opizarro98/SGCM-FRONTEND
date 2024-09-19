package com.ec.sgcm.services;

import java.util.List;
import com.ec.sgcm.model.Person;

public interface PersonService {

    Person createNewPerson(Person person);

    Person updateNewPerson(Person person);

    List<Person> searchAllPerson();

    Person searchPersonByIdentification(String identification);

}
