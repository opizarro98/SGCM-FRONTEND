package com.ec.sgcm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.model.Person;
import com.ec.sgcm.services.PersonService;

@RestController
@RequestMapping("/personRest")
public class PersonController {

    @Autowired
    private PersonService personController;

    @CrossOrigin(origins = "*")
    @PostMapping("/createNewPerson")
    @ResponseBody
    public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {
        return ResponseEntity.ok().body(personController.createNewPerson(person));
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/updatePerson")
    @ResponseBody
    public ResponseEntity<Person> uppdatePerson(@RequestBody Person person) {
        return ResponseEntity.ok().body(personController.updateNewPerson(person));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchForAllPersons")
    @ResponseBody
    public ResponseEntity<List<Person>> searchForAllPersons() {
        return ResponseEntity.ok().body(personController.searchAllPerson());
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchPersonByIdentification/{identification}")
    @ResponseBody
    public ResponseEntity<Person> searchPersonByIdentification(@PathVariable String identification) {
        Person findPerson = personController.searchPersonByIdentification(identification);
        return ResponseEntity.ok().body(findPerson);
    }
}
