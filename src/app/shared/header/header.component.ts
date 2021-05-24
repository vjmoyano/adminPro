import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imageUrl:string;
  public name:string;
  public email:string;

  public usuario : Usuario;

  constructor(private userS: UsuarioService, private router: Router) {

    this.imageUrl = this.userS.usuario.imagenUrl;
    this.name=this.userS.usuario.nombreUser;
    this.email=this.userS.usuario.emailUser;

    this.usuario = this.userS.usuario;

   }

  ngOnInit(): void {



  }

  logout(): void {
    this.userS.logout();
  }



}
