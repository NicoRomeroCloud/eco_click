package com.ecoclick.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.ecoclick.models.Usuario;

public interface IUsuario {

	List<Usuario> getAllUsuarios();
	
	Optional<Usuario> getUsuarioById(int idUsuario);
	
	Optional<Usuario> getUsuarioByEmail(String email);
	
	boolean createUsuario(Usuario usuario);
	
	boolean deleteUsuario(int idUsuario);
	
	boolean editUsuario(Usuario usuario);
	
	boolean changePassword(Usuario usuario, String password);
	
	boolean recoverPassword(String email);
}
