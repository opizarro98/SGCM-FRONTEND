package com.ec.sgcm.model.dto;

import com.ec.sgcm.model.CategoriesCIE;
import com.ec.sgcm.model.DiagnosisCIE;
import com.ec.sgcm.model.DiagnosisPerson;
import com.ec.sgcm.model.Persons;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DiagnosisPersonsIDDTO {
    DiagnosisPerson diagnosisPerson;
    CategoriesCIE categori;

}
