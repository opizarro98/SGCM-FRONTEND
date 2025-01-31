package com.ec.sgcm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.CategoriesCIE;

@Repository
public interface CategorieCIERepo extends JpaRepository<CategoriesCIE, Long> {

    @Query("FROM CategoriesCIE WHERE code = :code")
    CategoriesCIE findByCode1(String code);

    CategoriesCIE findByID(Long idCategory);
    Optional<CategoriesCIE> findByCode(String code);

}
