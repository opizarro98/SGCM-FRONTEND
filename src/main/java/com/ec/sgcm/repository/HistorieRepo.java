package com.ec.sgcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ec.sgcm.model.Histories;

public interface HistorieRepo extends JpaRepository<Histories, Long> {

}
