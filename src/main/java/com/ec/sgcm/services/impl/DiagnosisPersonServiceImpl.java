package com.ec.sgcm.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import com.ec.sgcm.model.CategoriesCIE;
import com.ec.sgcm.model.dto.DiagnosisPersonsIDDTO;
import com.ec.sgcm.repository.CategorieCIERepo;
import com.ec.sgcm.services.mappers.AppointmentMapper;
import com.ec.sgcm.services.mappers.DiagnosisMapper;
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
    CategorieCIERepo categorieCIERepo;

    @Autowired
    private PersonRepo personRepo;

    @Override
    public DiagnosisPerson createNewDiagnosisPerson(DiagnosisPerson diagnosisPerson) {
        return diagnosisPersonRepo.save(diagnosisPerson);
    }

    @Override
    public DiagnosisPerson updateDiagnosisPerson(DiagnosisPerson diagnosisPerson) {
        DiagnosisPerson finDiagnosis =  diagnosisPersonRepo.findByIdPerson(diagnosisPerson.getPerson());
        finDiagnosis.setDiagnosisCIE(diagnosisPerson.getDiagnosisCIE());
        return diagnosisPersonRepo.save(finDiagnosis);
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
        DiagnosisPerson updateDiagnosis = diagnosisPersonRepo.findByIdPerson(person);
        return updateDiagnosis;
    }

    @Override
    public DiagnosisPersonsIDDTO getDiagnosisPersonByPersonIdwithCategory(Long idPerson) {
        Persons person = personRepo.findById(
                        idPerson)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la persona con el ID: " + idPerson));
        DiagnosisPerson updateDiagnosis = diagnosisPersonRepo.findByIdPerson(person);
        CategoriesCIE updateCategory = categorieCIERepo.findByID(updateDiagnosis.getDiagnosisCIE().getCategory().getId());
        //return updateDiagnosis.stream()
               // .map(AppointmentMapper::toDTO)
               // .collect(Collectors.toList());
        return null;
    }

    @Override
    public void deleteDiagnosisPerson(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteDiagnosisPerson'");
    }

}
