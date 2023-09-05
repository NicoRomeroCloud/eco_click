package com.ecoclick.controller;

import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecoclick.models.Usuario;
import com.ecoclick.services.interfaces.IUsuario;

@RestController
public class UsuarioController {

	@Autowired
	IUsuario usuarioService;
	
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/usuario", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Usuario>> getUsuarios(){
		List<Usuario> usuarios = usuarioService.getAllUsuarios();
		try {
			if(usuarios != null) {
				return ResponseEntity.ok(usuarios);
			}
			return ResponseEntity.notFound().build();
		}catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/usuario/{id_usuario}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> getUsuarioById(@PathVariable int id_usuario){
		Optional<Usuario> usuario = usuarioService.getUsuarioById(id_usuario);
		try {
			if(usuario.isPresent()) {
				return ResponseEntity.ok(usuario.get());
			}
			return ResponseEntity.notFound().build();
		}catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/usuario/email/{email}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String email){
		Optional<Usuario> usuario = usuarioService.getUsuarioByEmail(email);
		try {
			if(usuario.isPresent()) {
				return ResponseEntity.ok(usuario.get());
			}
			return ResponseEntity.notFound().build();
		}catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping(value = "/usuario", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> postUsuario(@RequestBody Usuario usuario){
		try {
			if(usuarioService.createUsuario(usuario)) {
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping(value = "/usuario", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> putUsuario(@RequestBody Usuario usuario){
		try {
			if(usuarioService.editUsuario(usuario)) {
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}
	
	@CrossOrigin(origins = "*")
	@DeleteMapping(value = "/usuario/{id_usuario}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> deleteUsuario(@PathVariable int id_usuario){
		try {
			usuarioService.deleteUsuario(id_usuario);
			return ResponseEntity.ok().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping(value = "/usuario/validate", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> changePassword(@RequestBody String requestBody){
		try {
			 JSONObject jsonObject = new JSONObject(requestBody);
			 Usuario usuario = new Usuario();
			 usuario.setEmail(jsonObject.getString("email"));
			 usuario.setPassword(jsonObject.getString("oldPassword")); 
			 String password = jsonObject.getString("newPassword");
			if(usuarioService.changePassword(usuario, password)){
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping(value = "/usuario/recoverPassword", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> recoverPassword(@RequestBody String email){
		try {
			if(usuarioService.recoverPassword(email)) {
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
	}
}
