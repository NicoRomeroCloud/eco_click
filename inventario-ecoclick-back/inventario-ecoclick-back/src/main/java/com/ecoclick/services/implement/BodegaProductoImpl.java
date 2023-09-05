package com.ecoclick.services.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoclick.models.BodegaProducto;
import com.ecoclick.models.BodegaProductoId;
import com.ecoclick.models.Producto;
import com.ecoclick.repository.ProductoBodegaRep;
import com.ecoclick.repository.ProductoRep;
import com.ecoclick.services.interfaces.IBodegaProducto;

@Service
public class BodegaProductoImpl implements IBodegaProducto {

	@Autowired
	ProductoBodegaRep rep;
	
	@Autowired
	ProductoRep productoRep;
	
	@Override
	public List<BodegaProducto> getAllProductos() {
		try {
			return rep.findAll();
		} catch (Exception e) {
			return new ArrayList<BodegaProducto>();
		}
	}

	@Override
	public BodegaProducto getBodegaProductoByProductoAndBodega(int idProducto, int idBodega) {
		try {
			BodegaProductoId id = new BodegaProductoId();
			id.setBodegaId(idBodega);
			id.setProductoId(idProducto);
			return rep.findById(id);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public boolean actualizarStock(BodegaProducto bodegaProducto) {
		try {
			BodegaProducto aux = this.getBodegaProductoByProductoAndBodega(bodegaProducto.getId().getProductoId(), bodegaProducto.getId().getBodegaId());
			if(aux != null) {
				int diferenciaStock = bodegaProducto.getStock() - aux.getStock();
				Producto producto = this.productoRep.findById(bodegaProducto.getId().getProductoId()).get();
				producto.setUnidades(producto.getUnidades()+diferenciaStock);
				this.productoRep.saveAndFlush(producto);
				this.rep.saveAndFlush(bodegaProducto);
				return true;
			}else {
				Producto producto = this.productoRep.findById(bodegaProducto.getId().getProductoId()).get();
				producto.setUnidades(producto.getUnidades()+bodegaProducto.getStock());
				this.productoRep.saveAndFlush(producto);
				this.rep.saveAndFlush(bodegaProducto);
				return true;
			}
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public List<BodegaProducto> getBodegaProductoByProducto(int idProducto) {
		try {
			return rep.findByProductoId(idProducto);
		} catch (Exception e) {
			return null;
		}
	}
	
}