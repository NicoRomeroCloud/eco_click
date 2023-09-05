import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseObject } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { IBodega } from 'src/app/interfaces/bodega';


@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  constructor(private http:HttpClient) { }

  getBodegas():Observable<ResponseObject>{
    const url = environment.apiConnect.bodega;
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();

  }
  getProductosBodega(id:any){
    const url = `${environment.apiConnect.bodega}/${id}/productos`;
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();

  }
  desvincularProductoBodega(id_bodega:any, id_producto:any){
    const url = `${environment.apiConnect.bodega}/${id_bodega}/producto/${id_producto}`;
    return this.http.delete<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  postProducto(idBodega:number, idProducto:number): Observable<ResponseObject>{
    const url = `${environment.apiConnect.bodega}/${idBodega}/producto/${idProducto}`;
    return this.http.post<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  postBodega(bodega:IBodega):Observable<ResponseObject>{
    const url = environment.apiConnect.bodega;
    return this.http.post<ResponseObject>(url, bodega, {headers: environment.headers}).pipe();

  }

  putBodega(bodega:IBodega):Observable<ResponseObject>{
    const url = environment.apiConnect.bodega;
    return this.http.put<ResponseObject>(url, bodega, {headers: environment.headers}).pipe();

  }

  deleteBodega(bodega:number):Observable<ResponseObject>{
    const url = environment.apiConnect.bodega+"/"+bodega;
    return this.http.delete<ResponseObject>(url, {headers: environment.headers}).pipe();

  }
}
