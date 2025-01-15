package com.ec.sgcm.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.ec.sgcm.model.Antecedents;
import com.ec.sgcm.model.Persons;
import com.ec.sgcm.repository.AntecedentsRepo;
import com.ec.sgcm.services.AntecedentsService;

@Service
public class AntecedentsServiceImpl implements AntecedentsService {

    @Autowired
    private AntecedentsRepo antecedentsRepo;

    @Override
    public Antecedents createNewAntecedent(Antecedents antecedents) {
        return antecedentsRepo.save(antecedents);
    }

    @Override
    public Antecedents updateAntecedent(Antecedents antecedents) {
        Optional<Antecedents> existingAntecedentOpt = antecedentsRepo.findById(antecedents.getId());
        if (existingAntecedentOpt.isPresent()) {
            Antecedents existingAntecedent = existingAntecedentOpt.get();
            existingAntecedent.setDescription(antecedents.getDescription());
            return antecedentsRepo.save(existingAntecedent);
        } else {
            throw new IllegalArgumentException("No se encontró el antecedente con el ID proporcionado.");
        }
    }

    @Override
    public List<Antecedents> getAllAntecedents() {
        return antecedentsRepo.findAll();
    }

    @Override
    public Antecedents getAntecedentByIdPerson(Long idperson) {
        // Antecedents findAntecedents = antecedentsRepo.findByIdPerson(idperson);
        // if (findAntecedents != null) {
        // return findAntecedents;
        // } else {
        // throw new IllegalArgumentException("No se encontró el antecedente con el ID:
        // " + idperson);
        // }

        return null;
    }

    @Override
    public void deleteAntecedent(Long id) {
        if (!antecedentsRepo.existsById(id)) {
            throw new IllegalArgumentException("No se encontró el antecedente con el ID: " + id);
        }
        antecedentsRepo.deleteById(id);
    }
}
