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
    @Column(name = "appointment_id")
    @Comment("ID de la cita media, campo autoincrementable")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    @JsonBackReference // Marca esta relación como la referencia "hija"
    private Persons person;

    @Column(nullable = false)
    @Comment("Fecha en la que agenda la cita")
    private LocalDate date;

    @Column(nullable = false)
    @Comment("Hora en la que agenda la cita")
    private LocalTime hour;

    @Column(nullable = false)
    @Comment("Razon por la que asiste a la consulta")
    private String reason; // Motivo de la consulta

    @Column(nullable = false, name = "is_cancelled")
    @Comment("Campo para verificar si la cita se cancelo")
    private boolean isCancelled;

    @Column(nullable = false, name = "is_atended")
    @Comment("Campo para verificar si la cita se atendio")
    private boolean isAttended;
}