import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomeContentComponent } from './components/home/home-content/home-content.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AuthLoginGuard } from './components/guards/auth-login.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion/configuracion.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { RecuperarContrasenaComponent } from './components/passwordRecover/recuperar-contrasena/recuperar-contrasena.component';
import { BodegaModule } from './modules/bodega/bodega.module';
import { ProductosVentaComponent } from './components/productos-venta/productos-venta.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'changePassword', component: RecuperarContrasenaComponent},
  {path: '', component: HomeComponent,
  canActivate: [AuthLoginGuard],
  children:[
    {path:'', redirectTo:'/home', pathMatch: 'full'},
    {path:'home', component: HomeContentComponent},
    {path:'categoria', component: CategoriasComponent},

    {path:'productos', component: ProductosComponent},
    {path:'usuarios', component: UsuariosComponent},
    {path:'configuracion', component: ConfiguracionComponent},
    {path:'usuarios', component: CategoriasComponent},
    {path:'venta', component: ProductosVentaComponent},
    {path:'bodega', loadChildren: () => import('./modules/bodega/bodega.module').then(m => m.BodegaModule),},
    {path:'**', redirectTo:'/home', pathMatch:'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
