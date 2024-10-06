package com.ec.sgcm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.model.Histories;
import com.ec.sgcm.services.HistorieService;

@RestController
@RequestMapping("/historieRest")
public class HistorieController {

    @Autowired
    HistorieService historieService;

    @PostMapping("/createNewHistorie")
    @ResponseBody
    public ResponseEntity<Histories> createNewHistorie(@RequestBody Histories histories) {
        return ResponseEntity.ok().body(historieService.createNewHistorie(histories));
    }
}
