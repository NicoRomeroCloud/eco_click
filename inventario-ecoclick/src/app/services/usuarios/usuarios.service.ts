import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario, ResponseObject } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  getUsuarios():Observable<ResponseObject>{
    const url = environment.apiConnect.usuario;
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  getUsuarioById(id: number):Observable<ResponseObject>{
    const url = environment.apiConnect.usuario+'/'+id;
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  getUsuarioByEmail(email:string):Observable<ResponseObject>{
    const url = environment.apiConnect.usuario+'/email/'+email;
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  deleteUsuario(id:number): Observable<ResponseObject>{
    const url = environment.apiConnect.usuario+"/"+id;
    return this.http.delete<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  postUsuario(usuario:IUsuario): Observable<ResponseObject>{
    const url = environment.apiConnect.usuario;
    return this.http.post<ResponseObject>(url, usuario, {headers: environment.headers}).pipe();
  }

  putUsuario(usuario:IUsuario): Observable<ResponseObject>{
    const url = environment.apiConnect.usuario;
    return this.http.put<ResponseObject>(url, usuario, {headers: environment.headers}).pipe();
  }

  changePassword(email:string, oldPassword:string, newPassword: string): Observable<ResponseObject>{
    const url = environment.apiConnect.usuario+'/validate';
    const requestBody = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.post<ResponseObject>(url, requestBody,{headers: environment.headers}).pipe();
  }

  recoverPassword(email:string){
    const url = environment.apiConnect.usuario+'/recoverPassword';
    return this.http.put<ResponseObject>(url, email, {headers: environment.headers}).pipe();
  }

  getPerfiles():Observable<ResponseObject>{
    const url = environment.apiConnect.perfil+'/perfiles';
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();
  }
}
