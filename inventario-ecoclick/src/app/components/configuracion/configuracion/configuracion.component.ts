import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUsuario } from 'src/app/interfaces/interfaces';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
declare var window: any;

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
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
export class ConfiguracionComponent implements OnInit {

  usuario: any;
  usuarioEdit: any;
  modalEditarUsuario: any;

  constructor(private router: Router, private _userService: UsuariosService, private toast: ToastrService){
    this.usuario = {
      id_usuario: 0,
      nombre: "",
      email: "",
      imagen: ""
    }

    this.usuarioEdit = {
      id_usuario: 0,
      nombre: "",
      email: "",
      imagen: ""
    }
  }

  ngOnInit(): void {
    this.modalEditarUsuario = new window.bootstrap.Modal(
      document.getElementById("modal-editar-usuario"),
      {
        backdrop: "static",
        keyboard: false
      }
    );

    this.getUsuario();
  }

  getUsuario(){
    let usuario:any = localStorage.getItem('usuario');
    this._userService.getUsuarioByEmail(JSON.parse(usuario).sub).subscribe(
      resp => {
        this.usuario = resp;
        this.usuarioEdit = {
          id_usuario: this.usuario.id_usuario,
          nombre: this.usuario.nombre,
          email: this.usuario.email,
          imagen: this.usuario.imagen
        }
      }
    )
  }

  editarUsuario(){
    this.modalEditarUsuario.show();
  }

  cambiarRuta(ruta:string){
    this.router.navigateByUrl(ruta);
  }

  closeModal(form:any){
    this.modalEditarUsuario.hide();
  }
  
  onSubmit(form:any){
    this._userService.putUsuario(this.usuarioEdit).subscribe(
      resp => {
        this.closeModal(form);
        this.getUsuario();
        this.toast.success("Usuario editado, se ha enviado un correo informando de esta acción")
      }
    )
  }
}
