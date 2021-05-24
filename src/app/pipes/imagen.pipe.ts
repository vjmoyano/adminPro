import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const api_url = environment.base_url

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string,tipo: ("usuarios"|"hospitales"|"medicos")): string {
    if(!img){
      return `${api_url}/uploads/usuarios/no-image`;
    }else if(img){
      return `${api_url}/uploads/${tipo}/${img}`;
    }else{
      return `${api_url}/uploads/usuarios/no-image`;
    }

  }

}
