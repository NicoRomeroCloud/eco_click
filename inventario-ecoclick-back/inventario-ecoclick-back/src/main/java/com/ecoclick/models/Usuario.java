package com.ecoclick.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_usuario")
	private int id_usuario;
	
	@Column(name = "nombre")
	private String nombre;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "imagenUsuario", columnDefinition = "LONGTEXT")
	private String imagen;
	
	@ManyToOne(optional=true, fetch = FetchType.LAZY)
    @JoinColumn(name = "idPerfil")
	@JsonIgnoreProperties("usuarios")
	private Perfil perfil;
}