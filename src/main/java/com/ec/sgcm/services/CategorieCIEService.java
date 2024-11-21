package com.ec.sgcm.services;

import java.util.List;

import com.ec.sgcm.model.CategoriesCIE;

public interface CategorieCIEService {

    CategoriesCIE createNewCategorie(CategoriesCIE categorie);

    List<CategoriesCIE> searchAllCategorie();

    CategoriesCIE searchCategorieByCode(String code);
}
