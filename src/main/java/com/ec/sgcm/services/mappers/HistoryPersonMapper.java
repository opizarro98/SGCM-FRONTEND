package com.ec.sgcm.services.mappers;

import com.ec.sgcm.model.Antecedents;
import com.ec.sgcm.model.DiagnosisPerson;
import com.ec.sgcm.model.Histories;
import com.ec.sgcm.model.dto.HistoryPerson;

public class HistoryPersonMapper {
    public static HistoryPerson toHistoryPerson(Histories histories, Antecedents antecedents,
            DiagnosisPerson diagnosisPerson) {
        HistoryPerson historyPerson = new HistoryPerson();
        historyPerson.setHistory(histories);
        historyPerson.setDiagnostic(diagnosisPerson.getDiagnosisCIE().getDescription());
        historyPerson.setAntecedents(antecedents.getDescription());
        return historyPerson;
    }

}
