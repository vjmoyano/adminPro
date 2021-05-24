import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-users.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class BusquedasService {


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {'x-token':this.token}
    }
  }

  constructor(private http: HttpClient) { }

  private transformUsuarios(resultados :any[]):Usuario[]{

    return resultados.map(user=>
      new Usuario(user.nombre,user.email, user.img, user.role, '', user.uid, user.google));
  }



  busqueda(tipo : 'usuarios'|'medicos'|'hospitales',
    termino:string
  ){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url,this.headers).pipe(
      map((resp:any)=>{
        switch (tipo) {
          case 'usuarios':
            return this.transformUsuarios(resp.resultados);
            break;
          case 'hospitales':
            return resp.resultados;
            break;


          default:
            break;
        }
      })
    )
  }

}
