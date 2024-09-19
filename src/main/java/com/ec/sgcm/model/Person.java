package com.ec.sgcm.model;

import org.hibernate.annotations.Comment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_id")
    @Comment("Ud de la persona, es un campo autoincrementable")
    private Long id;

    @Column(nullable = false)
    @Comment("Numero de cedula, ruc o pasaporte de la persona")
    private String identification;

    @Column(nullable = false)
    @Comment("Nombre de la persona")
    private String first_name;

    @Column(nullable = false)
    @Comment("Apellidos de la persona ")
    private String last_name;

    @Column(nullable = false)
    @Comment("Fecha de nacimeinto de la persona")
    private String birth_date;

    @Column(nullable = false)
    @Comment("Ocupacion de la persona.")
    private String occupancy;

}
