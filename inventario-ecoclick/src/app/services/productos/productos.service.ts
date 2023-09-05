import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducto, ResponseObject } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  getProductos():Observable<ResponseObject>{
    const url = environment.apiConnect.producto;
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  getProductoById(id: number):Observable<ResponseObject>{
    const url = environment.apiConnect.producto+'/'+id;
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  deleteProducto(id:number): Observable<ResponseObject>{
    const url = environment.apiConnect.producto+"/"+id;
    return this.http.delete<ResponseObject>(url, {headers: environment.headers}).pipe();
  }

  postProducto(producto:IProducto): Observable<ResponseObject>{
    const url = environment.apiConnect.producto;
    return this.http.post<ResponseObject>(url, producto, {headers: environment.headers}).pipe();
  }

  putProducto(id: number, producto:IProducto): Observable<ResponseObject>{
    const url = environment.apiConnect.producto;
    return this.http.put<ResponseObject>(url, producto, {headers: environment.headers}).pipe();
  }
  
  actualizarStockBodega(bodegaProducto:any): Observable<ResponseObject>{
    const url = environment.apiConnect.bodega+'Producto';
    return this.http.put<ResponseObject>(url, bodegaProducto, {headers: environment.headers}).pipe();
  }

  getBOdegaProducto(idBodega:number, idProducto:number ):Observable<ResponseObject>{
    const url = environment.apiConnect.bodega+'Producto/'+idBodega+'/'+idProducto;
    return this.http.get<ResponseObject>(url, {headers: environment.headers}).pipe();
  } 

  getBodegasProductoByIdProducto(idProducto:number ):Observable<any>{
    const url = environment.apiConnect.bodega+'Producto/'+idProducto;
    return this.http.get<any>(url, {headers: environment.headers}).pipe();
  } 
}
