package com.ec.sgcm.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.DiagnosisPerson;
import com.ec.sgcm.repository.DiagnosisPersonRepo;
import com.ec.sgcm.services.DiagnosisPersonService;

@Service
public class DiagnosisPersonServiceImpl implements DiagnosisPersonService {

    @Autowired
    DiagnosisPersonRepo diagnosisPersonRepo;

    @Override
    public DiagnosisPerson createNewDiagnosisPerson(DiagnosisPerson DiagnosisPerson) {
        Optional<DiagnosisPerson> existingDiagnosisPersons = diagnosisPersonRepo
                .findById(DiagnosisPerson.getId());
        if (existingDiagnosisPersons.isPresent()) {
            DiagnosisPerson existDiagnosisPersonsnew = existingDiagnosisPersons.get();
            existDiagnosisPersonsnew.setDescription(DiagnosisPerson.getDescription());
            System.out.println("se guardo correcatmente el diagnostico de la persona "
                    + existDiagnosisPersonsnew.getDescription());
            return diagnosisPersonRepo.save(existDiagnosisPersonsnew);
        } else {
            throw new IllegalArgumentException("No se encontró el diagnostico con el ID proporcionado.");
        }
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
    public DiagnosisPerson getDiagnosisPersonById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getDiagnosisPersonById'");
    }

    @Override
    public void deleteDiagnosisPerson(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteDiagnosisPerson'");
    }

}
