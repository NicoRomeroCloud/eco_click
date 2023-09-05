package com.ecoclick.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.ModelAttribute;

import com.ecoclick.models.Bodega;
import com.ecoclick.models.Producto;
import com.ecoclick.services.interfaces.IBodega;

@RestController
public class BodegaController {

	@Autowired
    IBodega bodegaService;

    @CrossOrigin(origins = "*")
	@GetMapping(value = "/bodegas/{idBodega}/productos", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Producto>> getProductosBodega(@PathVariable int idBodega){
		List<Producto> productos = bodegaService.getAllProductosBodega(idBodega);
		if(productos != null) {
			return ResponseEntity.ok(productos);
		}
		return ResponseEntity.notFound().build();
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/bodegas/{idBodega}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Bodega> getBodegaById(@PathVariable int idBodega){
		Optional<Bodega> bodega = bodegaService.getBodegaById(idBodega);
		if(bodega.isPresent()) {
			return ResponseEntity.ok(bodega.get());
		}
		return ResponseEntity.notFound().build();
	}

	@CrossOrigin(origins = "*")
	@PutMapping(value = "/bodegas", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Bodega> putBodega(@RequestBody Bodega bodega){
		try {
			bodegaService.editBodega(bodega);
			return ResponseEntity.ok().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/bodegas", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Bodega>> getBodegas(){
		List<Bodega> bodegas = bodegaService.getAllBodegas();

		if(bodegas != null) {
			return ResponseEntity.ok(bodegas);
		}
		return ResponseEntity.notFound().build();
	}

    @CrossOrigin(origins = "*")
	@PostMapping(value = "/bodegas/{idBodega}/producto/{idProducto}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Producto> postProdcuto(@PathVariable int idBodega, @PathVariable int idProducto){
		try {
			bodegaService.addProductoBodega(idBodega, idProducto);
			return ResponseEntity.ok().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "/bodegas", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Bodega> postBodega(@RequestBody Bodega bodega) {
        try {
        	if(bodegaService.createBodega(bodega)) {
        		return ResponseEntity.ok().build();
        	}
        	return ResponseEntity.badRequest().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
    }

	@CrossOrigin(origins = "*")
	@DeleteMapping("/bodegas/{id}")
    public ResponseEntity<Bodega> deleteBodega(@PathVariable("id") int idBodega) {
		try {
			bodegaService.deleteBodega(idBodega);
			return ResponseEntity.ok().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
    }

	@CrossOrigin(origins = "*")
	@DeleteMapping(value = "/bodegas/{idBodega}/producto/{idProducto}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> deleteProductoBodega(@PathVariable int idBodega, @PathVariable int idProducto){
		try {
			 boolean result = bodegaService.deleteProductoBodega(idBodega, idProducto);
			 Map<String, Object> response = new HashMap<>();

			 if (result){
				response.put("message", "Producto desvinculado de la bodega exitosamente");
				response.put("success", true);
			 }else{
				response.put("message", "Hubo un problema al desvincular el producto de la bodega");
				response.put("success", false);
			 }
			 return ResponseEntity.ok(response);


		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}
}


