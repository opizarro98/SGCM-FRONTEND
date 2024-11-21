package com.ec.sgcm.services;

import java.util.List;

import com.ec.sgcm.model.Histories;

public interface HistorieService {

    Histories createNewHistorie(Histories histories);

    List<Histories> getAllHistories();

    Histories getHistoryById(Long id);
}
