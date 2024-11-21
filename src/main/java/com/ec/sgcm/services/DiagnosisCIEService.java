package com.ec.sgcm.services;

import java.util.List;

import com.ec.sgcm.model.DiagnosisCIE;
import com.ec.sgcm.model.dto.DiagnosisCIEDTO;

public interface DiagnosisCIEService {

    DiagnosisCIE createNewDiagnosis(DiagnosisCIE diagnosis);

    List<DiagnosisCIEDTO> searchAllDIagnosis();

    DiagnosisCIE searchDiagnosisByCode(String code);
}
