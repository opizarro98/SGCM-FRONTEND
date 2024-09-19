package com.ec.sgcm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.model.Antecedents;
import com.ec.sgcm.services.AntecedentsService;

@RestController
@RequestMapping("/antecedentsRest")
public class AntecedentsController {

    @Autowired
    AntecedentsService antecedentsService;

    @CrossOrigin(origins = "*")
    @PostMapping("/createNewAntecedent")
    @ResponseBody
    public ResponseEntity<Antecedents> createNewAntecedent(@RequestBody Antecedents antecedents) {
        return ResponseEntity.ok().body(antecedentsService.createNewAntecedent(antecedents));
    }
}
