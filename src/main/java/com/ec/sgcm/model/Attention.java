package com.ec.sgcm.model;

import org.hibernate.annotations.Comment;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "attention")
public class Attention {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    @Comment("Id de la atencion medica, es un campo autoincrementable")
    private Long id;

    @Column(nullable = false)
    @Comment("motivo de la consulta")
    private String reason;

    @Comment("Estado actual del paciente")
    @Column(name = "current_status", nullable = false)
    private String currentStatus;

    @Column(nullable = false, name = "intersession_task ")
    @Comment("tareas de intercesion ")
    private String intersessionTask;

    @Comment("Relacion con Diagnostico")
    @OneToOne(mappedBy = "attention", cascade = CascadeType.ALL)
    private Diagnosis diagnosis;
}
