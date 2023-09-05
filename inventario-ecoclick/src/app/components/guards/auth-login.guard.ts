import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate, CanDeactivate<unknown> {
  
  constructor(
    private apiLogin: LoginService,
    private router: Router,
    private toastr: ToastrService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.apiLogin.getToken()){
      let perfil = this.apiLogin.getPerfil();

      //Validar duracion del token
      if(!this.apiLogin.validarToken()){
        this.router.navigateByUrl('/login');
        localStorage.clear();
        this.toastr.error("Sesión expirada, vuelva a iniciar sesion")
        return false;
      }

      if(perfil === 'USR'){
        if(!state?.url.startsWith("/home") && !state?.url.startsWith("/configuracion") && !state?.url.startsWith("/venta") && !state?.url.startsWith("/login") && !state?.url.startsWith("/changePassword")){
          this.router.navigateByUrl("/home");
          return false;
        }
      }

      return true;
    }
    this.router.navigateByUrl("/login");
    return false;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
