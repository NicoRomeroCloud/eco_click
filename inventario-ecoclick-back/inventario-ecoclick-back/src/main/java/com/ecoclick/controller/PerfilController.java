package com.ecoclick.controller;

import com.ecoclick.models.Perfil;
import com.ecoclick.services.interfaces.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/perfil")
public class PerfilController {

    @Autowired
    PerfilService perfilService;

    @CrossOrigin(origins = "*")
    @PostMapping("/nuevo")
    public Perfil newPerfil(@RequestBody Perfil newPerfil){
        return this.perfilService.newPerfil(newPerfil);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/perfiles")
    public Iterable<Perfil> getAll(){
        return perfilService.getAll();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/modificarPerfil")
    public Perfil updatePerfil(@RequestBody Perfil perfil){
        return this.perfilService.modifyPerfil(perfil);
    }

    @CrossOrigin(origins = "*")
    @GetMapping(value = "{id}")
    public Boolean deletePersona(@PathVariable(value = "id") Long id){
        return this.perfilService.deletePerfil(id);
    }
}
