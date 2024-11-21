package com.ec.sgcm.model;

import java.util.List;

import org.hibernate.annotations.Comment;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "histories")
public class Histories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "histories_id")
    @Comment("Id de la historia clínica, es un campo autoincrementable")
    private Long id;

    // Relación con Persona (1 a 1)
    @OneToOne
    @JoinColumn(name = "person_id", nullable = false)
    @JsonBackReference
    private Persons person;

    // Relación con Atenciones Médicas
    @OneToMany(mappedBy = "history", cascade = CascadeType.ALL)
    private List<Attentions> attentions;
}