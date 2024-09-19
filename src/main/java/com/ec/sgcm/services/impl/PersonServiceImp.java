package com.ec.sgcm.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.Person;
import com.ec.sgcm.repository.PersonRepo;
import com.ec.sgcm.services.PersonService;

import java.util.List;

@Service
public class PersonServiceImp implements PersonService {

    public Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    PersonRepo personRepo;

    @Override
    public Person createNewPerson(Person person) {
        return personRepo.save(person);
    }

    @Override
    public Person updateNewPerson(Person person) {
        Person personExist = personRepo.findfindByIdentification(person.getIdentification());
        personExist.setFirst_name(person.getFirst_name());
        personExist.setLast_name(person.getLast_name());
        personExist.setBirth_date(person.getBirth_date());
        personExist.setOccupancy(person.getOccupancy());
        return personRepo.save(personExist);
    }

    @Override
    public List<Person> searchAllPerson() {
        return personRepo.findAll();
    }

    @Override
    public Person searchPersonByIdentification(String identification) {
        return personRepo.findfindByIdentification(identification);
    }

}
