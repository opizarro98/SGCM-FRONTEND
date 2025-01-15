package com.ec.sgcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.DiagnosisPerson;

@Repository
public interface DiagnosisPersonRepo extends JpaRepository<DiagnosisPerson, Long> {

}
