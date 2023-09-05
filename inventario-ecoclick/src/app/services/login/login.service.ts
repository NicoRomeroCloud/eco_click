import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(user:string, password:string){
    const url = environment.apiConnect.login;
    const usuario = {
      "nombre": user,
      "contrasena": password
    }
    return this.http.post(url, usuario, {observe: 'response'}).pipe(map((response: HttpResponse<any>) => {
        const headers = response.headers;

        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer ', '');
        const tokenParts = token.split('.');
        const body = JSON.parse(atob(tokenParts[1]));

        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(body));
        return body;
      }))
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getPerfil(){
    return JSON.parse(localStorage.getItem("usuario")!).code;
  }

  validarToken(){
    const token = localStorage.getItem('token');
    if(token != null){
      const tokenParts = token.split('.');
      const body = JSON.parse(atob(tokenParts[1]));
      if(body.exp*1000 >= Date.now()){
        return true;
      }
    }
    return false;
  }
}
