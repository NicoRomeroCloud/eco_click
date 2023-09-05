import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './components/listar/listar.component';
import { BodegaRoutingModule } from './bodega-routing.module';

import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    BodegaRoutingModule,
 

  ]
})
export class BodegaModule { }
