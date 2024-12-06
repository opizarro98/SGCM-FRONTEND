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
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.ec.sgcm.model.Histories;
import com.ec.sgcm.services.HistorieService;

@RestController
@RequestMapping("/historieRest")
@CrossOrigin(origins = { "*" })
public class HistorieController {

    @Autowired
    HistorieService historieService;

    // Crear o actualizar una historia clínica
    @PostMapping("createNewHistory")
    public ResponseEntity<Histories> createOrUpdateHistory(@Valid @RequestBody Histories history) {
        Histories savedHistory = historieService.createNewHistorie(history);
        return ResponseEntity.ok(savedHistory);
    }

    // Obtener todas las historias clínicas
    @GetMapping
    public ResponseEntity<List<Histories>> getAllHistories() {
        List<Histories> histories = historieService.getAllHistories();
        return ResponseEntity.ok(histories);
    }

    // Obtener una historia clínica por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Histories> getHistoryById(@PathVariable Long id) {
        Histories history = historieService.getHistoryById(id);
        return ResponseEntity.ok(history);
    }
}
