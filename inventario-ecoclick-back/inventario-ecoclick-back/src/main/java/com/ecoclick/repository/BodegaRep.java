package com.ecoclick.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecoclick.models.Bodega;

public interface BodegaRep extends JpaRepository<Bodega, Integer>{
    Optional<Bodega> findById(Integer id);
}
