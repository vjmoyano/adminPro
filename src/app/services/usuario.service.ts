import { Usuario } from './../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-users.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { LoginForm } from '../interfaces/loginForm.interface';
import {tap, map, catchError, delay} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
   }

  public auth2: any;
  public usuario: Usuario;

  // verificando token
get token(): string {
  return localStorage.getItem('token') || '';
}

get uid(): string{
  return this.usuario.uid || '';
}

get headers(){
  return {
    headers: {'x-token':this.token}
  }
}
  validarToken(): Observable<boolean>{


    return this.http.get(`http://localhost:3020/api/login/renew`,{
      headers: {'x-token':this.token}
    }).pipe(
      map((resp: any) => {
        localStorage.setItem('token', resp.token);
        const {nombre, email, google, role, uid,img=''} = resp.user;
        console.log(google);
        console.log(resp.user.uid);
        this.usuario = new Usuario(nombre,email, img, role,'' ,uid, google);

	      return true;
      }),

      catchError(error=>of(false))
    )
  }

  crearUsuario(formData: RegisterForm){
    console.log("creando user");
    return  this.http.post(`http://localhost:3020/api/usuarios`, formData)
                        .pipe(
                          tap((resp: any)=>{
                            localStorage.setItem('token', resp.token);
                          })
                        );
  }

  //actualiza el perfil
  updateUser(data: {email: string, nombre: string, role: string}, uid: string){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);

  }


  updateUsuario(usuario: Usuario){

    // data = {
    //   ...data,
    //   role: this.usuario.role
    // }

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);

  }

  loginUsuario(formData: LoginForm){
    console.log("logueando user");
    return  this.http.post(`http://localhost:3020/api/login`, formData)
                      .pipe(
                        tap((resp: any)=>{
                          localStorage.setItem('token', resp.token);
                        })
                      );
  }

  loginGoogle(token){
    console.log("logueando user");
    return  this.http.post(`http://localhost:3020/api/login/google`, {token})
                      .pipe(
                        tap((resp: any)=>{
                          localStorage.setItem('token', resp.token);
                        })
                      );
  }

  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      console.log('User signed out.');
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  googleInit(){

    gapi.load('auth2',()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '787408917127-maqoeqaio7fl50hq2atsc704o6uae0hm.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });

    });
  }

  cargarUsuarios(desde:number=0){

    //localhost:3020/api/usuarios?desde=0
    const url = `${base_url}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuario>(url,this.headers).pipe(
      delay(300),
      map(resp=>{
        const usuarios = resp.usuarios.map(user=>
          new Usuario(user.nombre,user.email, user.img, user.role, '', user.uid, user.google)
        )
        return {
          total : resp.total,
          usuarios

        }
      })
    )
  }

  eliminarUser(usuario:Usuario){
    // /usuarios/id
    const url = `${base_url}/usuarios/${usuario.uid}`
    return this.http.delete(url, this.headers);
  }

}
