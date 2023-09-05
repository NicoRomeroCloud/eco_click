package com.ecoclick.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.ecoclick.models.Bodega;
import com.ecoclick.models.Producto;

public interface IBodega {
    
    List<Bodega> getAllBodegas();
	
	Optional<Bodega> getBodegaById(int idBodega);

	boolean createBodega(Bodega bodega);
	
	boolean deleteBodega(int idBodega);
	
	boolean editBodega(Bodega bodega);

    List<Producto> getAllProductosBodega(int idBodega);

	boolean addProductoBodega(int idBodega, int idProducto);

	boolean deleteProductoBodega(int idBodega, int idProducto);
}
