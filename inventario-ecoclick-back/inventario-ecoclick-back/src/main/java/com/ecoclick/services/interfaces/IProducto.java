package com.ecoclick.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.ecoclick.models.Producto;

public interface IProducto {

    List<Producto> getAllProductos();
	
	Optional<Producto> getProductoById(int idProducto);
	
	boolean createProducto(Producto producto);
	
	boolean deleteProducto(int idProducto);
	
	boolean editProducto(Producto producto);
}
