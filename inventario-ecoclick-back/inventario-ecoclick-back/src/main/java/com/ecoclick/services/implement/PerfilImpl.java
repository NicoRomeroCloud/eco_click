package com.ecoclick.services.implement;

import com.ecoclick.models.Perfil;
import com.ecoclick.repository.PerfilRep;
import com.ecoclick.services.interfaces.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PerfilImpl implements PerfilService {

    @Autowired
    private PerfilRep perfilRep;

    @Override
    public Perfil newPerfil(Perfil newPerfil) {
        return perfilRep.save(newPerfil);
    }

    @Override
    public Iterable<Perfil> getAll() {
        return perfilRep.findAll();
    }

    @Override
    public Perfil modifyPerfil(Perfil perfil) {
        Optional<Perfil> perfilActual = this.perfilRep.findById(perfil.getIdPerfil());
        if (perfilActual.get() != null){
            perfilActual.get().setCodigo(perfil.getCodigo());

            return this.newPerfil(perfilActual.get());
        }
        return null;
    }

    @Override
    public Boolean deletePerfil(Long idPerfil) {
        this.perfilRep.deleteById(idPerfil);
        return true;
    }
}
