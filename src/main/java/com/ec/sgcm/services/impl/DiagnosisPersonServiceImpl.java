package com.ec.sgcm.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.DiagnosisPerson;
import com.ec.sgcm.model.Persons;
import com.ec.sgcm.repository.DiagnosisPersonRepo;
import com.ec.sgcm.repository.PersonRepo;
import com.ec.sgcm.services.DiagnosisPersonService;

@Service
public class DiagnosisPersonServiceImpl implements DiagnosisPersonService {

    @Autowired
    DiagnosisPersonRepo diagnosisPersonRepo;

    @Autowired
    private PersonRepo personRepo;

    @Override
    public DiagnosisPerson createNewDiagnosisPerson(DiagnosisPerson diagnosisPerson) {
        return diagnosisPersonRepo.save(diagnosisPerson);
    }

    @Override
    public DiagnosisPerson updateDiagnosisPerson(DiagnosisPerson DiagnosisPerson) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateDiagnosisPerson'");
    }

    @Override
    public List<DiagnosisPerson> getAllDiagnosisPerson() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllDiagnosisPerson'");
    }

    @Override
    public DiagnosisPerson getDiagnosisPersonByPersonId(Long idPerson) {
        Persons person = personRepo.findById(
                idPerson)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la persona con el ID: " + idPerson));
        return diagnosisPersonRepo.findByIdPerson(person);
    }

    @Override
    public void deleteDiagnosisPerson(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteDiagnosisPerson'");
    }

}
