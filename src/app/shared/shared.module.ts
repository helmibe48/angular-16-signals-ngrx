import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CobaComponent } from './components/coba/coba.component';
import { Coba2Component } from './components/coba2/coba2.component';



@NgModule({
  declarations: [
    CobaComponent,
    Coba2Component
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
