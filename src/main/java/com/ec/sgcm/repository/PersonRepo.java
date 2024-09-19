package com.ec.sgcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.Person;

@Repository
public interface PersonRepo extends JpaRepository<Person, Long> {

    @Query("FROM Person WHERE  identification = :identification")
    public Person findfindByIdentification(String identification);

}
