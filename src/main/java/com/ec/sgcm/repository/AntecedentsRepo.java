package com.ec.sgcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.Antecedents;

@Repository
public interface AntecedentsRepo extends JpaRepository<Antecedents, Long> {
}
