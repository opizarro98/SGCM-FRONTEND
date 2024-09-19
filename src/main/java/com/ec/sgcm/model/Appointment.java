package com.ec.sgcm.model;

import org.hibernate.annotations.Comment;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    @Comment("Id del turno, es un campo autoincrementable")
    private Long id;

    @Column(nullable = false)
    @Comment("Fecha de la consulta")
    private String date;

    @Column(nullable = false)
    @Comment("hora de la consulta ")
    private String hour;

    @Column(nullable = false)
    @Comment("motivo de la consulta")
    private String description;

    @Comment("Relacion con la persona")
    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Person person;
}
