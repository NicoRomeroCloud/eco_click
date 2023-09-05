package com.ecoclick.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecoclick.models.Bodega;
import com.ecoclick.models.BodegaProducto;
import com.ecoclick.services.interfaces.IBodegaProducto;

@RestController
public class BodegaProductoController {

	@Autowired
    IBodegaProducto service;

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/bodegasProducto/{idBodega}/{idProducto}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<BodegaProducto> getBodegaByIdProductoAndIdBodega(@PathVariable int idBodega, @PathVariable int idProducto){
		BodegaProducto bodegaProducto = service.getBodegaProductoByProductoAndBodega(idProducto, idBodega);
		if(bodegaProducto != null) {
			return ResponseEntity.ok(bodegaProducto);
		}
		return ResponseEntity.notFound().build();
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/bodegasProducto/{idProducto}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<BodegaProducto>> getBodegaByIdProducto(@PathVariable int idProducto){
		List<BodegaProducto> bodegaProducto = service.getBodegaProductoByProducto(idProducto);
		return ResponseEntity.ok(bodegaProducto);
	}

	@CrossOrigin(origins = "*")
	@PutMapping(value = "/bodegasProducto", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Bodega> actualizarStock(@RequestBody BodegaProducto bodega){
		try {
			if(service.actualizarStock(bodega)) {
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}
}