package com.ec.sgcm.services;

import java.util.List;

import com.ec.sgcm.model.Histories;
import com.ec.sgcm.model.dto.HistoryPerson;

public interface HistorieService {

    Histories createNewHistorie(Histories histories);

    List<Histories> getAllHistories();

    Histories getHistoryById(Long id);

    HistoryPerson getPersonHistoryById(Long id);
}
