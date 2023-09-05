package com.ecoclick.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecoclick.models.Producto;
import com.ecoclick.services.interfaces.IProducto;

@RestController
@CrossOrigin(origins = ("*")) 
public class ProductoController {

	@Autowired
	IProducto productoService;
	
	@GetMapping(value = "/productos", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Producto>> getProductos(){
		List<Producto> productos = productoService.getAllProductos();
		if(productos != null) {
			return ResponseEntity.ok(productos);
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping(value = "/productos", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Producto> postProducto(@RequestBody Producto producto){
		try {
			productoService.createProducto(producto);
			return ResponseEntity.ok().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping(value = "/productos/{idProducto}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Producto> deleteProducto(@PathVariable int idProducto){
		try {
			productoService.deleteProducto(idProducto);
			return ResponseEntity.ok().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}

	@PutMapping(value = "/productos", consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Producto> putProducto(@RequestBody Producto producto){
		try {
			System.out.println(producto);
			productoService.editProducto(producto);
			return ResponseEntity.ok().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}
}