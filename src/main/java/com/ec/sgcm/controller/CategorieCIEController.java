package com.ec.sgcm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.model.CategoriesCIE;
import com.ec.sgcm.services.CategorieCIEService;

@RestController
@RequestMapping("/categorieRest")
@CrossOrigin(origins = { "*" })
public class CategorieCIEController {

    @Autowired
    CategorieCIEService categorieCIEService;

    @PostMapping("/createNewCategories")
    @ResponseBody
    public ResponseEntity<CategoriesCIE> createNewCategorie(@RequestBody CategoriesCIE categorie) {
        return ResponseEntity.ok().body(categorieCIEService.createNewCategorie(categorie));
    }

    @GetMapping("/searchForAllCategorie")
    @ResponseBody
    public ResponseEntity<List<CategoriesCIE>> searchForAllCategories() {
        return ResponseEntity.ok().body(categorieCIEService.searchAllCategorie());
    }

    @GetMapping("/searchCategorieForCode/{codeCategorie}")
    @ResponseBody
    public ResponseEntity<CategoriesCIE> searchCategorieForCode(@PathVariable String codeCategorie) {
        return ResponseEntity.ok().body(categorieCIEService.searchCategorieByCode(codeCategorie));
    }
}
