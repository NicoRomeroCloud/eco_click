package com.ecoclick.models;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Perfil {

    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column
    private Long idPerfil;

    @Column(name="codigo")
    private String codigo;

    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "perfil")
    @JsonIgnoreProperties("perfil")
    private List<Usuario> usuarios;
}