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
@Table(name = "antecedents")
public class Antecedents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "antecedents_id")
    @Comment("Id de el antecedente de la persona, es un campo autoincrementable")
    private Long id;

    @Column(nullable = false)
    @Comment("descripcion del antecedente")
    private String description;

    // Relación con Person
    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    private Persons person;

    public Antecedents orElseThrow(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    }

}
