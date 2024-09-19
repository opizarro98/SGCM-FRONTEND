package com.ec.sgcm.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.Antecedents;
import com.ec.sgcm.repository.AntecedentsRepo;
import com.ec.sgcm.services.AntecedentsService;

@Service
public class AntecedentsServiceImp implements AntecedentsService {

    @Autowired
    AntecedentsRepo antecedentsRepo;

    @Override
    public Antecedents createNewAntecedent(Antecedents antecedents) {
        return antecedentsRepo.save(antecedents);
    }

}
