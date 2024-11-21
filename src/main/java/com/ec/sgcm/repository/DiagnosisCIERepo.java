package com.ec.sgcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.DiagnosisCIE;

@Repository
public interface DiagnosisCIERepo extends JpaRepository<DiagnosisCIE, Long> {

    @Query("FROM DiagnosisCIE WHERE  code = :code")
    DiagnosisCIE findByCode(String code);

}
