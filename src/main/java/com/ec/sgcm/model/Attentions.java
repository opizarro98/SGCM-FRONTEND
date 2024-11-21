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
@Table(name = "attentions")
public class Attentions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attentions_id")
    @Comment("Id de la atencion medica, es un campo autoincrementable")
    private Long id;

    @Column(nullable = false)
    @Comment("motivo de la consulta")
    private String reason;

    @Comment("Estado actual del paciente")
    @Column(name = "current_status", nullable = false)
    private String currentStatus;

    @Column(nullable = false, name = "intersession_task ")
    @Comment("Tareas que deberia enviar despues de cada atencion medica")
    private String intersessionTask;

    // Relación con History
    @ManyToOne
    @JoinColumn(name = "history_id", nullable = false)
    private Histories history;
}
