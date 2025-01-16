package com.ec.sgcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.DiagnosisPerson;
import com.ec.sgcm.model.Persons;

@Repository
public interface DiagnosisPersonRepo extends JpaRepository<DiagnosisPerson, Long> {

    @Query("FROM DiagnosisPerson WHERE person = :idPerson")
    DiagnosisPerson findByIdPerson(@Param("idPerson") Persons idPerson);
}
