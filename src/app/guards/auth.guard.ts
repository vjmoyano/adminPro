import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {  tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userS: UsuarioService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot, ) {


    return this.userS.validarToken()
                      .pipe(
                        tap( autenticado=>{
                          if(!autenticado){
                            this.router.navigateByUrl('/login');
                          }
                        } )
                      )
  }

}
