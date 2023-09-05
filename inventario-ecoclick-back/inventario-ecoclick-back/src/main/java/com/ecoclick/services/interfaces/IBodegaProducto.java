package com.ecoclick.services.interfaces;

import java.util.List;

import com.ecoclick.models.Bodega;
import com.ecoclick.models.BodegaProducto;

public interface IBodegaProducto {

	List<BodegaProducto> getAllProductos();
	
	BodegaProducto getBodegaProductoByProductoAndBodega(int idProducto, int idBodega);
	
	List<BodegaProducto> getBodegaProductoByProducto(int idProducto);
	
	boolean actualizarStock(BodegaProducto bodegaProducto);
}