package com.ecoclick.services.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoclick.models.Categoria;
import com.ecoclick.repository.CategoriaRep;
import com.ecoclick.services.interfaces.ICategoria;

@Service
public class CategoriaImpl implements ICategoria {

    @Autowired
	CategoriaRep categoriaRep;

    @Override
	public List<Categoria> getAllCategorias() {
		try {
			List<Categoria> productos = new ArrayList<Categoria>();
			productos = categoriaRep.findAll();
			return productos;
		} catch (Exception e) {
			return new ArrayList<Categoria>();
		}
	}

	@Override
	public Optional<Categoria> getCategoriaById(int idCategoria) {
		try {
			return categoriaRep.findById(idCategoria);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public boolean createCategoria(Categoria categoria) {
		try {
			categoriaRep.saveAndFlush(categoria);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean deleteCategoria(int idCategoria) {
		try {
			if(categoriaRep.existsById(idCategoria)) {
				categoriaRep.deleteById(idCategoria);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean editCategoria(Categoria categoria) {
		try {
			if(categoriaRep.existsById(categoria.getId_categoria())) {
				categoriaRep.saveAndFlush(categoria);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	} 
}
