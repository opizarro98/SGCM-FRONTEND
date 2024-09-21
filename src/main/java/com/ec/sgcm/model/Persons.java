package com.ec.sgcm.model;

import org.hibernate.annotations.Comment;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "person")
public class Persons {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "persons_id")
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birth_date;

    @Column(nullable = false)
    @Comment("Ocupacion de la persona.")
    private String occupancy;

    // Relaciones
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<Appointments> appointments;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<Antecedents> antecedents;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<Histories> histories;

}
