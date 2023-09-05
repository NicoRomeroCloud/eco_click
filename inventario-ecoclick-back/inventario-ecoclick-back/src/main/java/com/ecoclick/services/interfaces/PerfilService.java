package com.ecoclick.services.interfaces;

import com.ecoclick.models.Perfil;

public interface PerfilService {

    Perfil newPerfil(Perfil newPerfil);
    Iterable<Perfil> getAll();
    Perfil modifyPerfil(Perfil perfil);
    Boolean deletePerfil(Long idPerfil);

}
