package com.ecoclick.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@ComponentScan(basePackages = {
		"com.ecoclick.controller",
		"com.ecoclick.repository",
		"com.ecoclick.services.implement",
		"com.ecoclick.services.interfaces",
		"com.ecoclick.security"
})
@EntityScan(basePackages = {"com.ecoclick.models"})
@EnableJpaRepositories(basePackages = {"com.ecoclick.repository"})
@SpringBootApplication(scanBasePackages = "com.ecoclick")
public class InventarioEcoclickBackApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(InventarioEcoclickBackApplication.class, args);
		System.out.println(new BCryptPasswordEncoder().encode("1234"));
	}
}
