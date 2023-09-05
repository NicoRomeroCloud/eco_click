import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { AuthLoginGuard } from '../guards/auth-login.guard';
import { filter } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/interfaces';
import { LoginService } from 'src/app/services/login/login.service';
declare var window: any;

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  perfil:string = '';
  menuSelected:string = '';
  confirmationModal: any;
  usuario: IUsuario = {
    "id_usuario": 0,
    "nombre": "",
    "email": "",
    "imagen": ""
  };

  constructor(private router:Router, private loginService:LoginService){}


  ngOnInit(): void {
    // this.idPerfil = parseInt(localStorage.getItem("idPerfil")!,10);

    this.confirmationModal = new window.bootstrap.Modal(
      document.getElementById("modal-cerrar-sesion"),
      {
        backdrop: "static",
        keyboard: false
      }
    )
    this.getUsuario();
    this.getPerfil();
    this.verificarRuta();
  }

  verificarRuta(){
    this.menuSelected = this.router.url;
  }

  cerrarSesion(){
    this.confirmationModal.show();
  }

  closeModalConfirmar(){
    this.confirmationModal.hide();
  }

  limpiarSesion(){
    localStorage.removeItem("token");
    // localStorage.removeItem("idPerfil");
    this.router.navigateByUrl("/login");
    this.confirmationModal.hide();
  }

  setMenu(menu:string){
    this.menuSelected = menu;
  }

  cambiarRuta(ruta:string){
    this.router.navigate([ruta]);
  }

  getUsuario(){
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuario = JSON.parse(usuario);
    }
  }

  getPerfil(){
    this.perfil = this.loginService.getPerfil();
  }
}
