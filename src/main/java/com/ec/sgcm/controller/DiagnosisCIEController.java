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

import com.ec.sgcm.model.DiagnosisCIE;
import com.ec.sgcm.model.dto.DiagnosisCIEDTO;
import com.ec.sgcm.services.DiagnosisCIEService;

@RestController
@RequestMapping("/diagnosisRest")
@CrossOrigin(origins = { "*" })
public class DiagnosisCIEController {

    @Autowired
    DiagnosisCIEService diagnosisService;

    @PostMapping("/createNewDiagnosis")
    @ResponseBody
    public ResponseEntity<DiagnosisCIE> createNewDiagnosis(@RequestBody DiagnosisCIE diagnosis) {
        return ResponseEntity.ok().body(diagnosisService.createNewDiagnosis(diagnosis));
    }

    @GetMapping("/searchForAllDiagnosis")
    @ResponseBody
    public ResponseEntity<List<DiagnosisCIEDTO>> searchForAllDiagnosis() {
        return ResponseEntity.ok().body(diagnosisService.searchAllDIagnosis());
    }

    @GetMapping("/searchDiagnosisForCode/{codeDiagnosis}")
    @ResponseBody
    public ResponseEntity<DiagnosisCIE> searchDiagnosisForCode(@PathVariable String codeDiagnosis) {
        return ResponseEntity.ok().body(diagnosisService.searchDiagnosisByCode(codeDiagnosis));
    }
}
