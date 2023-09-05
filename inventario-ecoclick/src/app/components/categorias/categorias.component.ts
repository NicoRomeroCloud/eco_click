import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { ICategoria } from '../../interfaces/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, timer } from 'rxjs';
import Swal from 'sweetalert2';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { Form, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  category: ICategoria[] = [];
  categoria: ICategoria = new ICategoria();
  categoria2!: ICategoria;
  editar:boolean = false;

  checkoutFormGroup!: FormGroup;

  constructor( public formBuilder: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router, private categorias: CategoriasService){
    
  }

  idEliminarProducto:number = 0;

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      categoria: this.formBuilder.group({
        nombre: new FormControl('',
                                [Validators.required,
                                Validators.minLength(4)
                                ]),
        descripcion: new FormControl('',
                                    [Validators.required,
                                    Validators.minLength(5),
                                    ])
      })
    })

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategoria();

    

  }

 
    get nombre(){return this.checkoutFormGroup.get('categoria.nombre')}

    get descripcion(){return this.checkoutFormGroup.get('categoria.descripcion')}
  

  cargarDatos(categoria: ICategoria){
    this.categoria2.nombre = categoria.nombre;
    this.categoria2.descripcion = categoria.descripcion;
  }


  getCategoria(){
    this.categorias.getCategorias().subscribe(
      resp => {
        let respuesta: any = resp;
        this.category = respuesta;
        console.log(resp);
      },
      err => {
        console.log(err);
      }
    )
  }

  refresh(): void { window.location.reload(); }

  actualizar(){
    location.reload()
  }

  createCategory(){
    if(this.editar){
      let categoriaEdit:any = {
        id_categoria: this.categoria.id_categoria,
        nombre: this.categoria.nombre,
        descripcion: this.categoria.descripcion
      }
      this.categorias.putCategoria(categoriaEdit).subscribe(
        resp => {
          Swal.fire('Éxito al editar', 'Categoría editada correctamente', 'success'),
          setInterval(this.refresh, 1000);
          this.editar = false;
        }
      )
    }else{
      this.categorias.postCategoria(this.categoria).subscribe(
        resp =>{
          Swal.fire('Éxito al guardar', 'Categoría añadida a la base de datos correctamente', 'success'),
          setInterval(this.refresh, 1000);
          this.editar = false;
        }
      )
    }
  }

  eliminarProducto(categoria : ICategoria){

    // this.categorias.deleteCategoria(categoria.id_categoria).subscribe(
    //   resp =>{
    //     this.refresh();
        
    //   }
    // )

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estás seguro?',
      text: `¿Seguro que deseas eliminar la categoría ${categoria.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {
          this.categorias.deleteCategoria(categoria.id_categoria).subscribe(
              reponse => {
                  swalWithBootstrapButtons.fire(
                      'Eliminado!',
                      `El producto ${categoria.nombre} ha sido eliminado con éxito de la base de datos.`,
                      'success'
                    ),
        setInterval(this.refresh, 1000);

              
                  }
          )
    
        
      }

    });



    
  }
  
  actualizarProducto(categoria: ICategoria){
    this.editar = true;
    this.categoria = categoria;
  }
}
