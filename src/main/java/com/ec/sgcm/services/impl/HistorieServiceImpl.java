package com.ec.sgcm.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.Antecedents;
import com.ec.sgcm.model.DiagnosisPerson;
import com.ec.sgcm.model.Histories;
import com.ec.sgcm.model.Persons;
import com.ec.sgcm.model.dto.HistoryPerson;
import com.ec.sgcm.repository.AntecedentsRepo;
import com.ec.sgcm.repository.DiagnosisPersonRepo;
import com.ec.sgcm.repository.HistorieRepo;
import com.ec.sgcm.repository.PersonRepo;
import com.ec.sgcm.services.HistorieService;
import com.ec.sgcm.services.mappers.HistoryPersonMapper;

import jakarta.persistence.EntityNotFoundException;

@Service
public class HistorieServiceImpl implements HistorieService {

    @Autowired
    HistorieRepo historiesRepo;

    @Autowired
    AntecedentsRepo antecedentsRepo;

    @Autowired
    DiagnosisPersonRepo diagnosisPersonRepo;

    @Autowired
    private PersonRepo personRepo;

    @Override
    // Crear o actualizar una historia clínica
    public Histories createNewHistorie(Histories history) {
        if (history.getPerson() == null) {
            throw new IllegalArgumentException("El campo 'person' es obligatorio.");
        }
        return historiesRepo.save(history);
    }

    @Override
    // Obtener todas las historias clínicas
    public List<Histories> getAllHistories() {
        return historiesRepo.findAll();
    }

    @Override
    // Obtener una historia clínica por su ID
    public Histories getHistoryById(Long id) {
        return historiesRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Historia clínica no encontrada con el ID: " + id));
    }

    @Override
    // Obtener una historia clínica de un paciente por su ID history
    public HistoryPerson getPersonHistoryById(Long id) {
        Histories history = historiesRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Historia clínica no encontrada con el ID: " + id));

        Persons person = personRepo.findById(history.getPerson().getId())
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la persona con el ID: " + history
                        .getPerson().getId()));
        Antecedents findAntecedents = antecedentsRepo.findByIdPerson(person);
        DiagnosisPerson findDiagnosisPerson = diagnosisPersonRepo.findByIdPerson(person);
        return HistoryPersonMapper.toHistoryPerson(history, findAntecedents, findDiagnosisPerson);
    }
}
