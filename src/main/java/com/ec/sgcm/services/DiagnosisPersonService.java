package com.ec.sgcm.services;

import java.util.List;

import com.ec.sgcm.model.DiagnosisPerson;

public interface DiagnosisPersonService {

    DiagnosisPerson createNewDiagnosisPerson(DiagnosisPerson DiagnosisPerson);

    DiagnosisPerson updateDiagnosisPerson(DiagnosisPerson DiagnosisPerson);

    List<DiagnosisPerson> getAllDiagnosisPerson();

    DiagnosisPerson getDiagnosisPersonById(Long id);

    void deleteDiagnosisPerson(Long id);
}
