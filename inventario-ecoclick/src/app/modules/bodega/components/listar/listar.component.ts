import { Component, OnInit } from '@angular/core';
import { BodegaService } from '../../../../services/bodegas/bodega.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Form, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IBodega } from 'src/app/interfaces/bodega';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  visible:boolean = false;
  bodegas:any= [];
  bodega: IBodega = new IBodega();
  bodega2!: IBodega;
  productos_bodega:any = [];
  editar:boolean = false;
 
  constructor(public formBuilder: FormBuilder, private _bodegaService:BodegaService, private toastr: ToastrService){
    
  }
  ngOnInit(): void {
    this.getBodegas();
  }

  getBodegas(){
    this._bodegaService.getBodegas().subscribe(
      resp => {
        let respuesta: any = resp;
        this.bodegas = respuesta;
      }
    )
  }

  cargarDatos(bodega: IBodega){
    this.bodega2.ubicacion = bodega.ubicacion;
    this.bodega2.calle = bodega.calle;
    this.bodega2.comuna = bodega.comuna;
    this.bodega2.descripcion = bodega.descripcion;
    this.bodega2.numero = bodega.numero;
  }

  refresh(): void { window.location.reload(); }


  crearBodega() {

    if(this.editar){
      this._bodegaService.putBodega(this.bodega).subscribe(
        resp => {
          console.log(resp)
          Swal.fire('Éxito al editar', 'Bodega editada correctamente', 'success');
          setInterval(this.refresh, 1000);
        }
      );
    }else{
      this._bodegaService.postBodega(this.bodega).subscribe(
        resp => {
          console.log(resp)
          Swal.fire('Éxito al guardar', 'Bodega añadida a la base de datos correctamente', 'success');
          setInterval(this.refresh, 1000);
        }
      );
    }
  }

  editarBodega(bodega:any){
    this.bodega = bodega;
    this.editar = true;
  }
  

  listarProductos(id:any){
    this._bodegaService.getProductosBodega(id).subscribe({
      next:(res:any)=>{
        this.productos_bodega = res;
        console.log(res);
        
        this.visible = true;

      }
    })
  }

  desvincularProducto(producto:any){
    let id_bodega = producto.bodegas[0].id_bodega;
    let id_producto = producto.id_producto;
    console.log(id_producto, id_bodega);
    
    this._bodegaService.desvincularProductoBodega(id_bodega,id_producto).subscribe({
      next:(res:any)=>{
        if (res.success) {
          this.toastr.success(res.message);
          this.visible = false;
          this.ngOnInit();
        }else{
          this.toastr.error(res.message);
        }

        console.log(res);
        
      },
      error:(error:any)=>{
        console.log(error);
        
      }
    })
    
  }

  eliminarBodega(bodega:any){
    console.log("aaa")
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estás seguro?',
      text: `¿Seguro que deseas eliminar la bodega ubicada en ${bodega.calle}, ${bodega.comuna}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {
          this._bodegaService.deleteBodega(bodega.id_bodega).subscribe(
              reponse => {
                  swalWithBootstrapButtons.fire(
                      'Eliminado!',
                      `La bodega ha sido eliminado con éxito de la base de datos.`,
                      'success'
                    ),
        setInterval(this.refresh, 1000);

              
                  }
          )
    
        
      }

    });
  }

  // postProducto(producto:any){
  //   let id_bodega = producto.bodegas[0].id_bodega;
  //   let id_producto = producto.id_producto;
  //   console.log(id_producto, id_bodega);
    
  //   this._bodegaService.postProducto(id_bodega,id_producto).subscribe({
  //     next:(res:any)=>{
  //       if (res.success) {
  //         this.toastr.success(res.message);
  //         this.visible = false;
  //         this.ngOnInit();
  //       }else{
  //         this.toastr.error(res.message);
  //       }

  //       console.log(res);
        
  //     },
  //     error:(error:any)=>{
  //       console.log(error);
        
  //     }
  //   })
    
  // }
  
}
