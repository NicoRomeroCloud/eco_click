import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  IProducto } from 'src/app/interfaces/interfaces';
import { ICategoria } from 'src/app/interfaces/categoria';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.scss']
})
export class ProductoNuevoComponent implements OnInit {
  id_producto = 0;
  productoNuevo!: IProducto;
  listo: boolean = false;
  categorias: ICategoria[] = [];
  @Output() productoSave = new EventEmitter<IProducto>();

  constructor(private _apiCategoria: CategoriasService) {

    this.productoNuevo = {
      id_producto: 0,
      sku: '',
      nombre: '',
      descripcion: '',
      precio_costo: 0,
      precio_lista: 0,
      unidades: 0,
      categoria: {
        id_categoria: 0
      },
      bodegas:null
    }
  }

  cargarDatos(producto: IProducto) {
    this.productoNuevo.sku = producto.sku;
    this.productoNuevo.id_producto = producto.id_producto;
    this.productoNuevo.categoria = producto.categoria;
    this.productoNuevo.descripcion = producto.descripcion;
    this.productoNuevo.nombre = producto.nombre;
    this.productoNuevo.precio_costo = producto.precio_costo;
    this.productoNuevo.precio_lista = producto.precio_lista;
    this.productoNuevo.unidades = producto.unidades;
  }

  ngOnInit(): void {
    this.getCategorias();
  }

  onSubmit(form: any) {
    this.saveProducto();
  }

  resetForm() {
    this.productoNuevo = {
      id_producto: 0,
      sku: '',
      nombre: '',
      descripcion: '',
      precio_costo: 0,
      precio_lista: 0,
      unidades: 0,
      categoria: {
        id_categoria: 0
      },
      bodegas:null
    }
  }

  saveProducto() {
    this.productoSave.emit(this.productoNuevo);
  }

  getCategorias() {
    this._apiCategoria.getCategorias().subscribe(
      result => {
        let responseObject: any = result;
        this.categorias = responseObject;
        console.log("categorias", result)
      },
      error => {
        console.log(error);
      }
    )
  }
}
