import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild} from '@angular/core';
import { IProducto } from 'src/app/interfaces/interfaces';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ProductoNuevoComponent } from '../producto-nuevo/producto-nuevo.component';
import { ToastrService } from 'ngx-toastr';
import { BodegaService } from 'src/app/services/bodegas/bodega.service';
declare var window: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  animations: [
    trigger('sideState', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition(':enter', [
        animate(600, style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class ProductosComponent implements OnInit{
  productos: IProducto[] = [];
  productoNew: IProducto = {
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
  bodegaProductoNew: any = {
    stock: 0,
    id: {
      productoId: 0,
      bodegaId: 0
    }
  };
  bodegas:any;
  idEliminarProducto:number = 0;
  editar: boolean = false;
  modalNewProducto: any;
  modalConfirmarEliminar: any;
  modalStock: any;
  bodegasProducto:any[] = [];

  @ViewChild(ProductoNuevoComponent) nuevoProductoForm!: ProductoNuevoComponent;
  

  ngOnInit(): void {

    this.modalNewProducto = new window.bootstrap.Modal(
      document.getElementById("modal-nuevo-producto"),
      {
        backdrop: "static",
        keyboard: false
      }
    );

    this.modalConfirmarEliminar = new window.bootstrap.Modal(
      document.getElementById("modal-eliminar-producto"),
      {
        backdrop: "static",
        keyboard: false
      }
    );

    this.modalStock = new window.bootstrap.Modal(
      document.getElementById("modal-stock"),
      {
        backdrop: "static",
        keyboard: false
      }
    );

    this.getProductos();
    this.getBodegas();
  }

  constructor(private _apiProductos: ProductosService, private toastr: ToastrService, private _apiBodegas: BodegaService){}

  getProductos(){
    this._apiProductos.getProductos().subscribe(
      result => {
        let responseObject: any = result;
        this.productos = responseObject;
        console.log(result)
      },
      error => {
        console.log(error);
      }
    )
  }

  createProducto(producto:IProducto){
    this._apiProductos.postProducto(producto).subscribe(
      result => {
        this.nuevoProductoForm.resetForm();
        this.getProductos();
        this.modalNewProducto.hide();
      },
      error => {
        console.log(error);
      }
    )
  }

  editProducto(producto:IProducto){
    producto.categoria = {
      "id_categoria": producto.categoria.id_categoria
    }
    this._apiProductos.putProducto(producto.id_producto, producto).subscribe(
      result => {
        this.nuevoProductoForm.resetForm();
        this.getProductos();
        this.modalNewProducto.hide();
      },
      error => {
        console.log(error);
      }
    )
  }

  saveProducto(producto:IProducto){
    if(this.editar){
      this.editProducto(producto);
      this.editar = false;
    }else{
      this.createProducto(producto);
    }
  }

  editarProductoModal(producto:IProducto){
    this.editar = true;
    this.nuevoProductoForm.cargarDatos(producto);
    this.modalNewProducto.show();
  }

  eliminarProductoModal(id_producto: number){
    this.idEliminarProducto = id_producto;
    this.modalConfirmarEliminar.show();
  }

  closeModal(){
    this.nuevoProductoForm.resetForm();
    this.modalNewProducto.hide();
  }

  eliminarProducto(){
    this._apiProductos.deleteProducto(this.idEliminarProducto).subscribe(
      result => {
        this.toastr.success("Producto eliminado correctamente");
        this.getProductos();
        this.modalConfirmarEliminar.hide();
      },
      error => {
        console.log(error);
        this.toastr.error("Error al eliminar producto");
        this.modalConfirmarEliminar.hide();
      }
    )
  }
  
  editarStock(producto:IProducto){
    this.modalStock.show();
    this.getBodegasProductoById(producto.id_producto);
    this.bodegaProductoNew.id.productoId = producto.id_producto;
  }

  guardarStock(){
    console.log(this.bodegaProductoNew)
    this._apiProductos.actualizarStockBodega(this.bodegaProductoNew).subscribe(
      result => {
        this.toastr.success("Stock actualizado correctamente");
        this.getProductos();
        this.modalStock.hide();
      },
      error => {
        this.toastr.error("Error desconocido");
        this.modalStock.hide();
      }
    )
  }

  getBodegas(){
    this._apiBodegas.getBodegas().subscribe(
      resp => {
        this.bodegas = resp;
      }
    )
  }

  getBodegasProductoById(id:number){
    this._apiProductos.getBodegasProductoByIdProducto(id).subscribe(
      resp => {
        this.bodegasProducto = resp;
        console.log(this.bodegasProducto)
      }
    )
  }

  filtrarBodegaStock(){
    this.bodegaProductoNew.stock = this.bodegasProducto.filter(
      bodega => bodega.id.bodegaId == this.bodegaProductoNew.id.bodegaId
    )[0].stock;
  }

  closeModalStock(){
    this.bodegaProductoNew = {
      id:{
        bodegaId:0,
        productoId:0
      },
      stock:0
    };
    this.modalStock.hide();
  }
}
