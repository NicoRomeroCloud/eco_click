package com.ecoclick.services.implement;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecoclick.models.Usuario;
import com.ecoclick.repository.UsuarioRep;
import com.ecoclick.services.interfaces.IEmailService;
import com.ecoclick.services.interfaces.IUsuario;

@Service
public class UsuarioImpl implements IUsuario{
	
	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    private static final int PASSWORD_LENGTH = 8;
	
	@Autowired
	UsuarioRep usuarioRep;
	
	@Autowired
	IEmailService emailService;

	@Override
	public List<Usuario> getAllUsuarios() {
		try {
			List<Usuario> usuarios = new ArrayList<Usuario>();
			usuarios = usuarioRep.findAll();
			return usuarios;
		} catch (Exception e) {
			return new ArrayList<Usuario>();
		}
	}

	@Override
	public Optional<Usuario> getUsuarioById(int idUsuario) {
		try {
			return usuarioRep.findById(idUsuario);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public boolean createUsuario(Usuario usuario) {
		try {
			if(usuarioRep.findByEmail(usuario.getEmail()).isPresent()) {
				return false;
			}
			
			String password = generateRandomPassword();
			
			// Envío del correo electrónico
	        String to = usuario.getEmail();
	        String subject = "Bienvenido a la aplicación";
			String content = "<html><body>" +
	                "<h1>Bienvenido a ecoClick</h1>" +
	                "<p>¡Hola " + usuario.getNombre() + "!</p>" +
	                "<p>Tu contraseña generada es: <strong>" + password + "</strong></p>" +
	                "<a href='http://localhost:4200/#/login' target='_blank'>Pulsa aquí para iniciar sesión</a>" +
	                "<p>Equipo de la aplicación</p>" +
	                "</body></html>";
			emailService.sendEmail(to, subject, content);
			usuario.setPassword(new BCryptPasswordEncoder().encode(password));
			
			usuarioRep.saveAndFlush(usuario);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean deleteUsuario(int idUsuario) {
		try {
			if(usuarioRep.existsById(idUsuario)) {
				usuarioRep.deleteById(idUsuario);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean editUsuario(Usuario usuario) {
		try {
			if(usuarioRep.existsById(usuario.getId_usuario())) {
				Usuario usuarioExistente = usuarioRep.findByEmail(usuario.getEmail()).get();
				if(usuarioExistente != null && usuarioExistente.getId_usuario() != usuario.getId_usuario()) {
					return false;
				}
				
				// Envío del correo electrónico
		        String to = usuario.getEmail();
		        String subject = "Bienvenido a la aplicación";
				String content = "<html><body>" +
		                "<h1>Usuario Actualizado</h1>" +
		                "<p>¡Hola " + usuario.getNombre() + "!</p>" +
		                "<p>Te informamos que tu usuario acaba de ser actualizado</p>" +
		                "<p>Ingresa a la sección <strong>Usuario</strong> de tu aplicación</p>" +
		                "<a href='http://localhost:4200/#/home' target='_blank'>Pulsa aquí para dirigirte a revisar los cambios</a>" +
		                "<p>Equipo de la aplicación</p>" +
		                "</body></html>";
				emailService.sendEmail(to, subject, content);
				
				usuarioRep.saveAndFlush(usuario);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}
	
	private static String generateRandomPassword() {
        StringBuilder password = new StringBuilder();

        Random random = new SecureRandom();
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            int index = random.nextInt(CHARACTERS.length());
            password.append(CHARACTERS.charAt(index));
        }

        return password.toString();
    }

	@Override
	public boolean changePassword(Usuario usuario, String password) {
		try {
			System.out.println(usuario);
			System.out.println(password);
			Usuario usuarioExistente = usuarioRep.findByEmail(usuario.getEmail()).get();
			if(new BCryptPasswordEncoder().matches(usuario.getPassword(), usuarioExistente.getPassword())) {
				usuarioExistente.setPassword(new BCryptPasswordEncoder().encode(password));
				usuarioRep.saveAndFlush(usuarioExistente);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean recoverPassword(String email) {
		try {
			Optional<Usuario> usuarioOptional = usuarioRep.findByEmail(email);
			if(usuarioOptional.isPresent()) {
				Usuario usuario = usuarioOptional.get();
				String password = generateRandomPassword();
				// Envío del correo electrónico
		        String to = usuario.getEmail();
		        String subject = "Recuperación de contraseña";
				String content = "<html><body>" +
		                "<h1>Bienvenido a ecoClick</h1>" +
		                "<p>¡Hola " + usuario.getNombre() + "!</p>" +
		                "<p>Tu contraseña generada es: <strong>" + password + "</strong></p>" +
		                "<a href='http://localhost:4200/#/login' target='_blank'>Pulsa aquí para iniciar sesión</a>" +
		                "<p>Equipo de la aplicación</p>" +
		                "</body></html>";
				emailService.sendEmail(to, subject, content);
				usuario.setPassword(new BCryptPasswordEncoder().encode(password));
				usuarioRep.saveAndFlush(usuario);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Optional<Usuario> getUsuarioByEmail(String email) {
		try {
			return usuarioRep.findByEmail(email);
		} catch (Exception e) {
			return null;
		}
	}
	
	
	
}
