package com.ec.sgcm.model;

import org.hibernate.annotations.Comment;

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
@Table(name = "diagnosis_person")
public class DiagnosisPerson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diagnosis_person_id")
    @Comment("Id del diagnostico de la persona, es un campo autoincrementable")
    private Long id;

    @ManyToOne
    private DiagnosisCIE diagnosisCIE;

    // Relación con Person
    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    private Persons person;

}
