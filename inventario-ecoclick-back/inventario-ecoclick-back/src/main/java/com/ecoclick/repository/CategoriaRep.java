package com.ecoclick.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecoclick.models.Categoria;

public interface CategoriaRep extends JpaRepository<Categoria, Integer> {

	Optional<Categoria> findByNombre(String nombre_categoria);
}