import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomeContentComponent } from './components/home/home-content/home-content.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './components/productos/productos.component';
import { AuthInterceptor } from './components/guards/auth.interceptor';
import { ProductoNuevoComponent } from './components/producto-nuevo/producto-nuevo.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { SharedModule } from './modules/shared/shared.module';
import { BodegaModule } from './modules/bodega/bodega.module';
import { ConfiguracionComponent } from './components/configuracion/configuracion/configuracion.component';
import { RecuperarContrasenaComponent } from './components/passwordRecover/recuperar-contrasena/recuperar-contrasena.component';
import { ProductosVentaComponent } from './components/productos-venta/productos-venta.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterByCategoriaPipe } from './pipes/filter-by-categoria.pipe';
import { FilterByBodegaPipe } from './pipes/filter-by-bodega.pipe';
import { FilterBySKUPipe } from './pipes/filter-by-sku.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    LoginComponent,
    HomeComponent,
    HomeContentComponent,
    MenuLateralComponent,
    ProductosComponent,
    ProductoNuevoComponent,
    ConfiguracionComponent,
    CategoriasComponent,
    RecuperarContrasenaComponent,
    ProductosVentaComponent,
    FilterPipe,
    FilterByCategoriaPipe,
    FilterByBodegaPipe,
    FilterBySKUPipe
  ],
  imports: [
    BodegaModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
      timeOut: 2000,
      positionClass: 'toast-top-right',
      }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
