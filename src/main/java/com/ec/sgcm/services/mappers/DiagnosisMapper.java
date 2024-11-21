package com.ec.sgcm.services.mappers;

import com.ec.sgcm.model.CategoriesCIE;
import com.ec.sgcm.model.DiagnosisCIE;
import com.ec.sgcm.model.dto.DiagnosisCIEDTO;

public class DiagnosisMapper {
    public static DiagnosisCIEDTO toDTO(DiagnosisCIE diagnosisCIE, CategoriesCIE categoriesCIE) {
        DiagnosisCIEDTO dto = new DiagnosisCIEDTO();
        dto.setId(diagnosisCIE.getId());
        dto.setCode(diagnosisCIE.getCode());
        dto.setName(diagnosisCIE.getName());
        dto.setCategory(categoriesCIE.getCode() + " - " + categoriesCIE.getName());
        return dto;
    }
}
