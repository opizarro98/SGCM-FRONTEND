package com.ec.sgcm.services.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.CategoriesCIE;
import com.ec.sgcm.repository.CategorieCIERepo;
import com.ec.sgcm.services.CategorieCIEService;

@Service
public class CategorieCIEServiceImpl implements CategorieCIEService {

    public Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    CategorieCIERepo categorieCIERepo;

    @Override
    public CategoriesCIE createNewCategorie(CategoriesCIE diagnosis) {
        return categorieCIERepo.save(diagnosis);
    }

    @Override
    public List<CategoriesCIE> searchAllCategorie() {
        return categorieCIERepo.findAll();
    }

    @Override
    public CategoriesCIE searchCategorieByCode(String code) {
        return categorieCIERepo.findByCode1(code);
    }
}
