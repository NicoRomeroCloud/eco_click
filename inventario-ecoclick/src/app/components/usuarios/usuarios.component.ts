import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { IUsuario } from 'src/app/interfaces/interfaces';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
declare var window: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
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
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  perfiles: any[] = [];
  usuarioNuevo: any;
  modalNewUsuario: any;
  modalEliminarUsuario: any;
  editar: boolean = false;
  idEliminar: number = 0;
  usuario: any;

  constructor(private _apiUsuarios: UsuariosService, private toast: ToastrService){
    this.usuarioNuevo = {
      id_usuario: 0,
      nombre: "",
      email: "",
      imagen: "",
      perfil: {
        idPerfil : 0,
        codigo: ''
      }
    }
  }

  ngOnInit(): void {

    this.modalNewUsuario = new window.bootstrap.Modal(
      document.getElementById("modal-nuevo-usuario"),
      {
        backdrop: "static",
        keyboard: false
      }
    );

    this.modalEliminarUsuario = new window.bootstrap.Modal(
      document.getElementById("modal-eliminar-usuario"),
      {
        backdrop: "static",
        keyboard: false
      }
    );

    this.getUsuario();
    this.getUsuarios();
    this.getPerfiles();
  }

  getUsuarios(){
    this._apiUsuarios.getUsuarios().subscribe(
      result => {
        let responseObject: any = result;
        this.usuarios = responseObject.filter((usuario:IUsuario) => usuario.email !== this.usuario.sub);
        console.log(result)
      },
      error => {
        console.log(error);
      }
    )
  }

  getPerfiles(){
    this._apiUsuarios.getPerfiles().subscribe(
      result => {
        let responseObject: any = result;
        this.perfiles = responseObject;
        console.log(result)
      },
      error => {
        console.log(error);
      }
    )
  }

  eliminarUsuario(){
    this._apiUsuarios.deleteUsuario(this.idEliminar).subscribe(
      result => {
        this.modalEliminarUsuario.hide();
        this.getUsuarios();
      },
      error => {
        console.log(error);
      }
    )
  }

  showModal(crear:boolean, usuario:IUsuario){

  }

  showModalEliminar(id:number){
    this.modalEliminarUsuario.show();
    this.idEliminar = id;
  }

  closeModal(form: NgForm){
    this.modalNewUsuario.hide();
    this.editar = false;
    this.resetearForm();
    form.resetForm();
  }

  editarUsuario(usuario:IUsuario){
    this.editar = true;
    this.usuarioNuevo = usuario;
    this.modalNewUsuario.show();
  }

  onSubmit(form:NgForm){
    if(this.editar){
      this._apiUsuarios.putUsuario(this.usuarioNuevo).subscribe(
        result => {
          this.resetearForm();
          this.closeModal(form);
          this.getUsuarios();
        },
        error => {
          this.getUsuarios();
          this.toast.error("Ya existe un usuario con ese email");
        }
      )
    }else{
      this._apiUsuarios.postUsuario(this.usuarioNuevo).subscribe(
        result => {
          this.resetearForm();
          this.closeModal(form);
          this.getUsuarios();
        },
        error => {
          this.toast.error("Ya existe un usuario con ese email");
          this.resetearForm();
          this.closeModal(form);
        }
      )
    }
  }

  getUsuario(){
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuario = JSON.parse(usuario);
    }
  }

  resetearForm(){
    this.usuarioNuevo = {
      id_usuario: 0,
      nombre: "",
      email: "",
      imagen: "",
      perfil: {
        idPerfil : 0,
        codigo: ''
      }
    }
  }
}
