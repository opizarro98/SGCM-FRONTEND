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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "diagnosis")
public class DiagnosisCIE {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diagnosis_id")
    @Comment("Id del diagnostico, es un campo autoincrementable")
    private Long id;

    @Column(nullable = false)
    @Comment("código del diagnostico ")
    private String code;

    @Column(nullable = false)
    @Comment("Nombre del diagnostico")
    private String name;

    // Relación con Attention
    @OneToMany(mappedBy = "diagnosis", cascade = CascadeType.ALL)
    private List<Attentions> attentions;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonBackReference
    private CategoriesCIE category;
}
