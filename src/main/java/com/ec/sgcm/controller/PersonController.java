package com.ec.sgcm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.error.ApiErrorResponse;
import com.ec.sgcm.model.Persons;
import com.ec.sgcm.model.dto.PersonListDTO;
import com.ec.sgcm.services.PersonService;

@RestController
@RequestMapping("/personRest")
@CrossOrigin(origins = { "*" })
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/createNewPerson")
    @ResponseBody
    public ResponseEntity<?> createNewPerson(@RequestBody Persons person) {
        try {
            Persons createdPerson = personService.createNewPerson(person);
            return ResponseEntity.ok().body(createdPerson);
        } catch (IllegalArgumentException ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/personRest/createNewPerson", ex.getMessage(),
                    HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/personRest/createNewPerson",
                    "Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/updatePerson")
    @ResponseBody
    public ResponseEntity<?> updatePerson(@RequestBody Persons person) {
        try {
            Persons updatedPerson = personService.updateNewPerson(person);
            return ResponseEntity.ok().body(updatedPerson);
        } catch (IllegalArgumentException ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/personRest/updatePerson", ex.getMessage(),
                    HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/personRest/updatePerson",
                    "Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/searchForAllPersons")
    @ResponseBody
    public ResponseEntity<?> searchForAllPersons() {
        try {
            List<PersonListDTO> personsList = personService.searchAllPerson();
            return ResponseEntity.ok().body(personsList);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/personRest/searchForAllPersons",
                    "Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/searchPersonByIdentification/{identification}")
    @ResponseBody
    public ResponseEntity<?> searchPersonByIdentification(@PathVariable String identification) {
        try {
            Persons foundPerson = personService.searchPersonByIdentification(identification);
            return ResponseEntity.ok().body(foundPerson);
        } catch (IllegalArgumentException ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/personRest/searchPersonByIdentification",
                    ex.getMessage(), HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse("/personRest/searchPersonByIdentification",
                    "Persona no encontrada", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
