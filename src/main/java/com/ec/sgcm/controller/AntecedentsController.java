package com.ec.sgcm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.model.Antecedents;
import com.ec.sgcm.services.AntecedentsService;

import java.util.List;

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

    @CrossOrigin(origins = "*")
    @PutMapping("/updateAntecedent")
    @ResponseBody
    public ResponseEntity<Antecedents> updateAntecedent(@RequestBody Antecedents antecedents) {
        return ResponseEntity.ok().body(antecedentsService.updateAntecedent(antecedents));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllAntecedents")
    @ResponseBody
    public ResponseEntity<List<Antecedents>> getAllAntecedents() {
        return ResponseEntity.ok().body(antecedentsService.getAllAntecedents());
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAntecedentById/{id}")
    @ResponseBody
    public ResponseEntity<Antecedents> getAntecedentById(@PathVariable Long id) {
        return ResponseEntity.ok().body(antecedentsService.getAntecedentById(id));
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteAntecedent/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteAntecedent(@PathVariable Long id) {
        antecedentsService.deleteAntecedent(id);
        return ResponseEntity.ok().build();
    }
}
