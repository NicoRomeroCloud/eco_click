package com.ecoclick.services.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoclick.models.Producto;
import com.ecoclick.repository.ProductoRep;
import com.ecoclick.services.interfaces.IProducto;

@Service
public class ProductoImpl implements IProducto{
    
    @Autowired
	ProductoRep productoRep;

    @Override
	public List<Producto> getAllProductos() {
		try {
			List<Producto> productos = new ArrayList<Producto>();
			productos = productoRep.findAll();
			return productos;
		} catch (Exception e) {
			return new ArrayList<Producto>();
		}
	}

	@Override
	public Optional<Producto> getProductoById(int idProducto) {
		try {
			return productoRep.findById(idProducto);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public boolean createProducto(Producto producto) {
		try {
			productoRep.saveAndFlush(producto);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean deleteProducto(int idProducto) {
		try {
			if(productoRep.existsById(idProducto)) {
				productoRep.deleteById(idProducto);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean editProducto(Producto producto) {
		try {
			if(productoRep.existsById(producto.getId_producto())) {
				productoRep.saveAndFlush(producto);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}
}
