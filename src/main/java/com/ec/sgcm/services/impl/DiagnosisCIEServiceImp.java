package com.ec.sgcm.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.CategoriesCIE;
import com.ec.sgcm.model.DiagnosisCIE;
import com.ec.sgcm.model.dto.DiagnosisCIEDTO;
import com.ec.sgcm.repository.CategorieCIERepo;
import com.ec.sgcm.repository.DiagnosisCIERepo;
import com.ec.sgcm.services.DiagnosisCIEService;
import com.ec.sgcm.services.mappers.DiagnosisMapper;

@Service
public class DiagnosisCIEServiceImp implements DiagnosisCIEService {

    public Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    DiagnosisCIERepo diagnosisRepo;

    @Autowired
    CategorieCIERepo categorieCIERepo;

    @Override
    public DiagnosisCIE createNewDiagnosis(DiagnosisCIE diagnosis) {
        // CategoriesCIE category =
        // categorieCIERepo.findByCode(diagnosis.getCategory().getCode())
        // .orElseThrow(() -> new RuntimeException("Category not found"));
        // diagnosis.setCategory(category);
        return diagnosisRepo.save(diagnosis);
    }

    @Override
    public List<DiagnosisCIEDTO> searchAllDIagnosis() {
        List<DiagnosisCIE> diagnosisList = diagnosisRepo.findAll();
        return null;
        // return diagnosisList.stream()
        // .map(diagnosis -> DiagnosisMapper.toDTO(diagnosis, diagnosis.getCategory()))
        // .collect(Collectors.toList());
    }

    @Override
    public DiagnosisCIE searchDiagnosisByCode(String code) {
        return diagnosisRepo.findByCode(code);
    }

}
