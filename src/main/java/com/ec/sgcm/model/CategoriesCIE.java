package com.ec.sgcm.model;

import org.hibernate.annotations.Comment;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.CascadeType;
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
@Table(name = "categories")
public class CategoriesCIE {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    @Comment("Id de la categoria, es un campo autoincrementable")
    private Long id;

    @Column(nullable = false, unique = true)
    @Comment("Código de la categoría")
    private String code;

    @Column(nullable = false)
    @Comment("Nombre de la categoría")
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DiagnosisCIE> diagnoses = new ArrayList<>();
}