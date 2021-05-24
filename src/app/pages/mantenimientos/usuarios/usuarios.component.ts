import { delay } from 'rxjs/operators';
import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsers: number =0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  subscripImg: Subscription;

  desde :number =0;
  cargando: boolean = true;

  constructor(private usuariosS: UsuarioService,
    private busquedaS: BusquedasService,
    private imagenS: ModalImagenService) { }
  ngOnDestroy(): void {
    this.subscripImg.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsers();
    this.subscripImg=this.imagenS.imagenSubida.pipe(
      delay(500)
    ).subscribe(img=>{
      console.log(img);
      this.cargarUsers();
    })

  }

  cambiarPagina(valor:number){
    this.desde += valor;
    if(this.desde < 0 ){
      this.desde = 0;
    }else if(this.desde > this.totalUsers){
      this.desde -=valor;
    }
    this.cargarUsers();
  }

  cargarUsers(){
    this.cargando =  true;
    this.usuariosS.cargarUsuarios(this.desde).subscribe(({total, usuarios})=>{

      this.totalUsers = total;

      if(this.totalUsers!==0){
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
      }
      console.log(usuarios)
      this.cargando =  false;

    })
  }

  buscar(termino:string){
    if(termino.length<1){
      return this.usuarios = this.usuariosTemp;
    }
    console.log(termino);
    this.busquedaS.busqueda('usuarios',termino).subscribe((data)=>{
      this.usuarios = data;
    })
  }

  eliminarUsuario(usuario:Usuario){

    if(usuario.uid===this.usuariosS.usuario.uid){
      return Swal.fire('Error', 'No puedes borrar tu usuario', 'error');
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Vas a eliminar al usuario " + usuario.nombre,
      icon: 'question',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.value) {
        this.usuariosS.eliminarUser(usuario).subscribe((data)=>{
          Swal.fire('Usuario Borrado', `El usuario ${usuario.nombre} se eliminó de forma correcta`, 'success');
          this.cargarUsers();
        })
      }
    })
    console.log(usuario);
  }

  cambiarRole(usuario:Usuario){

    this.usuariosS.updateUsuario(usuario).subscribe(resp=>console.log(resp))
    console.log(usuario);
  }

  abrirModalImagen(usuario: Usuario){
    this.imagenS.abrirModal('usuarios',usuario.uid, usuario.img);
  }

}
