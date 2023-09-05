import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  ResponseObject } from 'src/app/interfaces/interfaces';
import { ICategoria } from "src/app/interfaces/categoria";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http:HttpClient) { }

  getCategorias():Observable<ResponseObject>{
    const url = environment.apiConnect.categoria;
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  getCategoriaById(id: number):Observable<ResponseObject>{
    const url = environment.apiConnect.categoria+'/'+id;
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  deleteCategoria(id:number): Observable<ResponseObject>{
    const url = environment.apiConnect.categoria+"/"+id;
    return this.http.delete<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  postCategoria(categoria:ICategoria): Observable<ResponseObject>{
    const url = environment.apiConnect.categoria;
    return this.http.post<ResponseObject>(url, categoria, {headers: environment.headers}).pipe();
  }

  putCategoria( categoria:ICategoria): Observable<ResponseObject>{
    const url = environment.apiConnect.categoria;
    return this.http.put<ResponseObject>(url, categoria, {headers: environment.headers}).pipe();
  }
}
