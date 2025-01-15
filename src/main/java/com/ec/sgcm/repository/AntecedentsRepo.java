package com.ec.sgcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.Antecedents;

@Repository
public interface AntecedentsRepo extends JpaRepository<Antecedents, Long> {

    @Query("FROM Antecedents WHERE person = :idPerson")
    Antecedents findByIdPerson(@Param("idPerson") Long idPerson);
}
