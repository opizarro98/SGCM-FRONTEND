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

    @Comment("Relacion con la persona")
    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Person person;

}
