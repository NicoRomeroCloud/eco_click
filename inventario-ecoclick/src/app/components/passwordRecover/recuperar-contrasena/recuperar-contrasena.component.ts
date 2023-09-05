import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUsuario } from 'src/app/interfaces/interfaces';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent {
  pass = true;
  usuario: any;
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private _apiUsuarios: UsuariosService, private router: Router, private toastr: ToastrService){
    this.usuario = {
      id_usuario: 0,
      nombre: '',
      email: '',
      imagen: '',
      password: ''
    }
  }

  resetForm(){
    this.usuario = {
      id_usuario: 0,
      nombre: '',
      email: '',
      imagen: '',
      password: ''
    }

    this.newPassword = "";
    this.confirmNewPassword = "";
  }

  onSubmit(){
    console.log(this.usuario)
    console.log(this.newPassword)
    this._apiUsuarios.changePassword(this.usuario.email, this.usuario.password, this.newPassword).subscribe(
      result => {
        this.toastr.success("Contraseña cambiada exitosamente")
        this.resetForm();
        this.router.navigateByUrl("/login");
      },
      error => {
        console.log(error);
        this.toastr.error("Correo o contraseña incorrecta")
      }
    )
  }
}
