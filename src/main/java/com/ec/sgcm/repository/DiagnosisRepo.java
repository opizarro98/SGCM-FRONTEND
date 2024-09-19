package com.ec.sgcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ec.sgcm.model.Diagnosis;

public interface DiagnosisRepo extends JpaRepository<Diagnosis, Long> {

    @Query("FROM Diagnosis WHERE  code = :code")
    Diagnosis findByCode(String code);

}
