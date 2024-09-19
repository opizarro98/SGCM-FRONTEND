package com.ec.sgcm.services.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.Diagnosis;
import com.ec.sgcm.repository.DiagnosisRepo;
import com.ec.sgcm.services.DiagnosisService;

@Repository
public class DiagnosisServiceImp implements DiagnosisService {

    public Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    DiagnosisRepo diagnosisRepo;

    @Override
    public Diagnosis createNewDiagnosis(Diagnosis diagnosis) {
        return diagnosisRepo.save(diagnosis);
    }

    @Override
    public List<Diagnosis> searchAllDIagnosis() {
        return diagnosisRepo.findAll();
    }

    @Override
    public Diagnosis searchDiagnosisByCode(String code) {
        return diagnosisRepo.findByCode(code);
    }

}
