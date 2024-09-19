package com.ec.sgcm.services;

import java.util.List;

import com.ec.sgcm.model.Diagnosis;

public interface DiagnosisService {

    Diagnosis createNewDiagnosis(Diagnosis diagnosis);

    List<Diagnosis> searchAllDIagnosis();

    Diagnosis searchDiagnosisByCode(String code);
}
