package com.ec.sgcm.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ec.sgcm.model.Appointments;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointments, Long> {

    @Query("FROM Appointments WHERE  id = :idAppointment")
    public Appointments findfindByID(Long idAppointment);

    @Query("FROM Appointments WHERE  isCancelled = false")
    public List<Appointments> findAllNotCanceled();

    @Query("FROM Appointments WHERE  isAttended = false and date = :today ORDER BY hour ASC")
    public List<Appointments> findAppointmentTodayNotAttended(LocalDate today);
}
