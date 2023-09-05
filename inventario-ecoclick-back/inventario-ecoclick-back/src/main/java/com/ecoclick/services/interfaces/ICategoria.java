package com.ecoclick.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.ecoclick.models.Categoria;

public interface ICategoria {
    List<Categoria> getAllCategorias();
	
	Optional<Categoria> getCategoriaById(int idCategoria);
	
	boolean createCategoria(Categoria categoria);
	
	boolean deleteCategoria(int idCategoria);
	
	boolean editCategoria(Categoria categoria);
}
