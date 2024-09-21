package com.ec.sgcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.Persons;

@Repository
public interface PersonRepo extends JpaRepository<Persons, Long> {

    @Query("FROM Persons WHERE  identification = :identification")
    public Persons findfindByIdentification(String identification);

}
