package com.ec.sgcm.model;

import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.Comment;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "appointments")
public class Appointments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointments_id")
    @Comment("Id del turno, es un campo autoincrementable")
    private Long id;

    @Column(nullable = false)
    @Comment("Fecha de la consulta")
    private LocalDate date;

    @Column(nullable = false)
    @Comment("Hora de la consulta")
    private LocalTime hour;

    @Column(nullable = false)
    @Comment("motivo de la consulta")
    private String description;

    // Relación con Person
    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    @JsonBackReference
    private Persons person;
}
