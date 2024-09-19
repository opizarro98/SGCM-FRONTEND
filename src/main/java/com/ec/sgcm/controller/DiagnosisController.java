package com.ec.sgcm.controller;

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

import java.util.List;

import com.ec.sgcm.model.Diagnosis;
import com.ec.sgcm.services.DiagnosisService;

@RestController
@RequestMapping("/diagnosisRest")
public class DiagnosisController {

    @Autowired
    DiagnosisService diagnosisService;

    @CrossOrigin(origins = "*")
    @PostMapping("/createNewDiagnosis")
    @ResponseBody
    public ResponseEntity<Diagnosis> createNewDiagnosis(@RequestBody Diagnosis diagnosis) {
        return ResponseEntity.ok().body(diagnosisService.createNewDiagnosis(diagnosis));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchForAllDiagnosis")
    @ResponseBody
    public ResponseEntity<List<Diagnosis>> searchForAllDiagnosis() {
        return ResponseEntity.ok().body(diagnosisService.searchAllDIagnosis());
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchDiagnosisForCode/{codeDiagnosis}")
    @ResponseBody
    public ResponseEntity<Diagnosis> searchDiagnosisForCode(@PathVariable String codeDiagnosis) {
        return ResponseEntity.ok().body(diagnosisService.searchDiagnosisByCode(codeDiagnosis));
    }
}
