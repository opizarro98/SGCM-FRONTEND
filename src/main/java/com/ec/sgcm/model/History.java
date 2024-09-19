package com.ec.sgcm.model;

import org.hibernate.annotations.Comment;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    @Comment("Id de la historia clinica, es un campo autoincrementable")
    private Long id;

    @Column(nullable = false)
    @Comment("")
    private String identification;
}
