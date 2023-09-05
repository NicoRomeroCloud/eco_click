import { style, trigger, state, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICategoria } from 'src/app/interfaces/categoria';
import { IProducto } from 'src/app/interfaces/interfaces';
import { BodegaService } from 'src/app/services/bodegas/bodega.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
declare var window: any;

@Component({
  selector: 'app-productos-venta',
  templateUrl: './productos-venta.component.html',
  styleUrls: ['./productos-venta.component.scss'],
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
export class ProductosVentaComponent implements OnInit {
  productos: IProducto[] = [];
  bodegas: any[] = [];
  categorias :ICategoria[] = [];
  productosVista: IProducto[] = [];

  busqueda: string = '';
  categoriaSeleccionada: number | null = null;
  bodegaSeleccionada: number | null = null;
  mostrarSinStock: boolean = false;
  orderBy: string = 'null';

  modalVenta: any;
  bodegaVentaId: number = 0;
  cantidadVenta: number = 0;
  bodegaVenta:any = null;
  productoVenta: IProducto = {
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

  constructor(private productosService:ProductosService, private bodegaService:BodegaService, private categoriaService:CategoriasService, private toastr: ToastrService){}
  ngOnInit(): void {
    this.modalVenta = new window.bootstrap.Modal(
      document.getElementById("modal-venta"),
      {
        backdrop: "static",
        keyboard: false
      }
    );
    this.getProductos();
    this.getBodegas();
    this.getCategorias();
  }

  getProductos(){
    this.productosService.getProductos().subscribe(
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

  getBodegas(){
    this.bodegaService.getBodegas().subscribe(
      result => {
        let responseObject: any = result;
        this.bodegas = responseObject;
        console.log(result)
      },
      error => {
        console.log(error);
      }
    )
  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe(
      result => {
        let responseObject: any = result;
        this.categorias = responseObject;
        console.log(result)
      },
      error => {
        console.log(error);
      }
    )
  }

  getBodegaProducto(){
    this.productosService.getBOdegaProducto(this.bodegaVentaId, this.productoVenta.id_producto).subscribe(
      result => {
        let responseObject: any = result;
        this.bodegaVenta = responseObject;
        console.log(result)
      },
      error => {
        console.log(error);
      }
    )
  }

  closeModal(){
    this.bodegaVentaId = 0;
    this.bodegaVenta = null;
    this.modalVenta.hide();
  }

  showModal(producto: IProducto){
    this.productoVenta = producto;
    this.modalVenta.show();
  }

  realizarVenta(){
    this.bodegaVenta.stock -= this.cantidadVenta;
    this.productosService.actualizarStockBodega(this.bodegaVenta).subscribe(
      result => {
        this.getProductos();
        this.modalVenta.hide();
      },
      error => {
        this.modalVenta.hide();
      }
    )
  }
}
