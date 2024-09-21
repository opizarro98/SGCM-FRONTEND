package com.ec.sgcm.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.Histories;
import com.ec.sgcm.repository.HistorieRepo;
import com.ec.sgcm.services.HistorieService;

@Service
public class HistorieServiceImpl implements HistorieService {

    @Autowired
    HistorieRepo historiesRepo;

    @Override
    public Histories createNewHistorie(Histories histories) {
        return historiesRepo.save(histories);
    }

}
