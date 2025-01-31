package com.ec.sgcm.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Comment;

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

    @OneToOne
    private DiagnosisCIE diagnosisCIE;

    // Relación con Person
    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    private Persons person;

}
