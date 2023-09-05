const pathBase = {
   // pathEcoClick : "https://demo-railway-production.up.railway.app"
    pathEcoClick : "http://localhost:8080"
    
}

export const environment = {
    headers: {
        'Content-Type': 'application/json'
    },
    apiConnect: {
        login: pathBase.pathEcoClick+'/login',
        producto: pathBase.pathEcoClick+'/productos',
        bodega: pathBase.pathEcoClick+"/bodegas",
        categoria: pathBase.pathEcoClick+"/categorias",
        usuario: pathBase.pathEcoClick+"/usuario",
        perfil: pathBase.pathEcoClick+"/perfil"
    }
}