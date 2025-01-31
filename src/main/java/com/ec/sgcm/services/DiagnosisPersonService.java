package com.ec.sgcm.services;

import java.util.List;

import com.ec.sgcm.model.DiagnosisPerson;
import com.ec.sgcm.model.dto.DiagnosisPersonsIDDTO;

public interface DiagnosisPersonService {

    DiagnosisPerson createNewDiagnosisPerson(DiagnosisPerson DiagnosisPerson);

    DiagnosisPerson updateDiagnosisPerson(DiagnosisPerson DiagnosisPerson);

    List<DiagnosisPerson> getAllDiagnosisPerson();

    DiagnosisPerson getDiagnosisPersonByPersonId(Long idPerson);

    DiagnosisPersonsIDDTO getDiagnosisPersonByPersonIdwithCategory(Long idPerson);

    void deleteDiagnosisPerson(Long id);
}
