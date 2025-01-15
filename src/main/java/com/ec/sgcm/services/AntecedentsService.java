package com.ec.sgcm.services;

import java.util.List;
import com.ec.sgcm.model.Antecedents;
import com.ec.sgcm.model.Persons;

public interface AntecedentsService {

    Antecedents createNewAntecedent(Antecedents antecedents);

    Antecedents updateAntecedent(Antecedents antecedents);

    List<Antecedents> getAllAntecedents();

    Antecedents getAntecedentByIdPerson(Long person);

    void deleteAntecedent(Long id);
}
