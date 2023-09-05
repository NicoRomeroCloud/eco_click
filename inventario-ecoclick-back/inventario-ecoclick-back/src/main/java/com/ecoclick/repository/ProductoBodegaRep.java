package com.ecoclick.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecoclick.models.BodegaProducto;
import com.ecoclick.models.BodegaProductoId;

@Repository
public interface ProductoBodegaRep extends JpaRepository<BodegaProducto, Integer> {
	
	 BodegaProducto findById(BodegaProductoId id);
	 
	 @Query("SELECT bp FROM BodegaProducto bp WHERE bp.id.productoId = :idProducto")
	    List<BodegaProducto> findByProductoId(@Param("idProducto") int idProducto);
}