import { ImagenPipe } from './imagen.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ImagenPipe],
  exports: [ImagenPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
