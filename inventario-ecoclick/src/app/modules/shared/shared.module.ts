import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule
  ],
  exports:[
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule
  
  ]
})
export class SharedModule { }
