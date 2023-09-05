package com.ecoclick.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecoclick.models.Usuario;

public interface UsuarioRep extends JpaRepository<Usuario, Integer> {

	Optional<Usuario> findByNombre(String nombre);
	
	Optional<Usuario> findByEmail(String email);
}
