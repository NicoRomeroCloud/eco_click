package com.ecoclick.services.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoclick.models.Bodega;
import com.ecoclick.models.BodegaProducto;
import com.ecoclick.models.BodegaProductoId;
import com.ecoclick.models.Producto;
import com.ecoclick.repository.BodegaRep;
import com.ecoclick.repository.ProductoBodegaRep;
import com.ecoclick.repository.ProductoRep;
import com.ecoclick.services.interfaces.IBodega;

import jakarta.transaction.Transactional;

@Service
public class BodegaImpl implements IBodega{

    @Autowired
    BodegaRep bodegaRep;

    @Autowired
    ProductoRep prodcutoRep;

    @Autowired
    ProductoBodegaRep productoBodegaRep;

    @Override
    public List<Bodega> getAllBodegas() {
        try {
			List<Bodega> bodegas = new ArrayList<>();
			bodegas = bodegaRep.findAll();
			return bodegas;
		} catch (Exception e) {
			return new ArrayList<Bodega>();
		}
    }

    @Override
    public Optional<Bodega> getBodegaById(int idBodega) {
        try {
			return bodegaRep.findById(idBodega);
		} catch (Exception e) {
			return null;
		}
    }

    @Override
    public boolean createBodega(Bodega bodega) {
            try {
                bodegaRep.saveAndFlush(bodega);
				return true;
            } catch (Exception e) {
                return false;
            }
        }

    @Override
    public boolean deleteBodega(int idBodega) {
        try {
			if(bodegaRep.existsById(idBodega)) {
				bodegaRep.deleteById(idBodega);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
    }

    @Override
    public boolean editBodega(Bodega bodega) {
        try {
			if(bodegaRep.existsById(bodega.getId_bodega())) {
				bodegaRep.saveAndFlush(bodega);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
    }

    @Override
    public List<Producto> getAllProductosBodega(int idBodega) {
        try {
			List<Producto> productos = new ArrayList<Producto>();
			productos = bodegaRep.findById(idBodega).get().getProductos();
			return productos;
		} catch (Exception e) {
			return new ArrayList<Producto>();
		}
    }

    @Override
    public boolean addProductoBodega(int idBodega, int idProducto) {
        try {
			if(bodegaRep.existsById(idBodega)) {
				BodegaProductoId id = new BodegaProductoId();
				id.setBodegaId(idBodega);
				id.setProductoId(idProducto);

				BodegaProducto bodegaProducto = new BodegaProducto();
				bodegaProducto.setId(id);
				bodegaProducto.setStock(0);

				productoBodegaRep.saveAndFlush((bodegaProducto));
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
    }

    @Override
    @Transactional
    public boolean deleteProductoBodega(int idBodega, int idProducto) {
        try {
            Bodega bodega= bodegaRep.findById(idBodega).orElse(null);
            Producto producto = prodcutoRep.findById(idProducto).orElse(null);

			if(bodega !=null && producto !=null) {

                bodega.getProductos().remove(producto);
                bodegaRep.save(bodega);

				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
    }
}
