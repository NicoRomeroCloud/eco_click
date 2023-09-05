import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  pass = true;
  username:string = "";
  password:string = "";
  token:string = "";
  modalRecoverPassword: any;
  emailRecuperacion: string = "";

  constructor(private _apiLogin:LoginService, private router:Router, private toastr: ToastrService, private _apiUsuario: UsuariosService){}

  ngOnInit(): void{
    this.modalRecoverPassword = new window.bootstrap.Modal(
      document.getElementById("modal-recover-password"),
      {
        backdrop: "static",
        keyboard: false
      }
    );
  }

  checkLogin(){
    this._apiLogin.login(this.username,this.password).subscribe(
      result => {
        this.savePerfil();
        this.showToast("Sesión iniciada correctamente", "OK");
        this.router.navigateByUrl('/home');
      },
     error =>{
      console.log(error);
      this.showToast("Usuario o contraseña incorrecta", "DANGER");
     } 
    )
  }

  savePerfil(){
  }

  showModal(){
    this.modalRecoverPassword.show();
  }

  closeModal(){
    this.modalRecoverPassword.hide();
  }

  showToast(mensaje: string, type: string) {
    if (type === 'OK') {
      this.toastr.success(mensaje);
    } else if (type === 'WARNING') {
      this.toastr.warning(mensaje);
    } else {
      this.toastr.error(mensaje);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.checkLogin();
    }
  }

  cambiarRuta(ruta: string){
    this.router.navigateByUrl(ruta);
  }

  onSubmit(form:any){
    this._apiUsuario.recoverPassword(this.emailRecuperacion).subscribe(
      result => {
        this.showToast("Se ha enviado una nueva contraseña a su correo", "OK");
        this.closeModal();
      },
     error =>{
      console.log(error);
      this.showToast("El usuario no existe", "DANGER");
     } 
    )
  }
}
