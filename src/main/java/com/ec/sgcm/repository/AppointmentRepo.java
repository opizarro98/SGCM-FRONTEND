package com.ec.sgcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.Appointments;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointments, Long> {

}
