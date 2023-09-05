package com.ecoclick.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecoclick.models.Producto;

public interface ProductoRep extends JpaRepository<Producto, Integer> {

	Optional<Producto> findByNombre(String nombre_producto);
}