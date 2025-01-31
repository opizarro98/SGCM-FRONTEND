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

import com.ec.sgcm.model.DiagnosisPerson;
import com.ec.sgcm.services.DiagnosisPersonService;

import java.util.List;

@RestController
@RequestMapping("/diagnosisPersonRest")
@CrossOrigin(origins = { "*" })
public class DiagnosisPersonController {

    @Autowired
    DiagnosisPersonService DiagnosisPersonService;

    @PostMapping("/createNewDiagnosis")
    @ResponseBody
    public ResponseEntity<DiagnosisPerson> createNewDiagnosis(@RequestBody DiagnosisPerson diagnosis) {
        return ResponseEntity.ok().body(DiagnosisPersonService.createNewDiagnosisPerson(diagnosis));
    }

    @PutMapping("/updateDiagnosis")
    @ResponseBody
    public ResponseEntity<DiagnosisPerson> updateDiagnosis(@RequestBody DiagnosisPerson diagnosis) {
        return ResponseEntity.ok().body(DiagnosisPersonService.updateDiagnosisPerson(diagnosis));
    }

    @GetMapping("/getAllDiagnosis")
    @ResponseBody
    public ResponseEntity<List<DiagnosisPerson>> getAllDiagnosis() {
        return ResponseEntity.ok().body(DiagnosisPersonService.getAllDiagnosisPerson());
    }

    @GetMapping("/getDiagnosisPersonByPersonId/{idperson}")
    @ResponseBody
    public ResponseEntity<DiagnosisPerson> getDiagnosisPersonByPersonId(@PathVariable Long idperson) {
        return ResponseEntity.ok().body(DiagnosisPersonService.getDiagnosisPersonByPersonId(idperson));
    }

    @GetMapping("/getDiagnosisPersonByPersonIdwithCategory/{idperson}")
    @ResponseBody
    public ResponseEntity<DiagnosisPerson> getDiagnosisPersonByPersonIdwithCategory(@PathVariable Long idperson) {
        return ResponseEntity.ok().body(DiagnosisPersonService.getDiagnosisPersonByPersonId(idperson));
    }

    @DeleteMapping("/deleteDiagnosis/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteDiagnosis(@PathVariable Long id) {
        DiagnosisPersonService.deleteDiagnosisPerson(id);
        return ResponseEntity.ok().build();
    }
}
