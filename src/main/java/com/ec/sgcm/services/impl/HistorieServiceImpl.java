package com.ec.sgcm.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.Histories;
import com.ec.sgcm.repository.HistorieRepo;
import com.ec.sgcm.services.HistorieService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class HistorieServiceImpl implements HistorieService {

    @Autowired
    HistorieRepo historiesRepo;

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
}
