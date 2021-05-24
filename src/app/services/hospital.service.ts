import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  // verificando token
  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return {
      headers: {'x-token':this.token}
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  cargarHospitales(){

    //localhost:3020/api/usuarios?desde=0
    const url = `${base_url}/hospitales`
    return this.http.get(url,this.headers).pipe(
      delay(200),
      map((resp:{ok: boolean, hospitales:Hospital[]})=> resp.hospitales)
    )
  }

  crearHospital(nombre:string){

    //localhost:3020/api/usuarios?desde=0
    const url = `${base_url}/hospitales`
    return this.http.post(url,{nombre},this.headers);
  }

  actualizarHospital(nombre:string, _id:string){

    //localhost:3020/api/usuarios?desde=0
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url,{nombre},this.headers);
  }

  eliminarHospital( _id:string){

    //localhost:3020/api/usuarios?desde=0
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url,this.headers);
  }

}
