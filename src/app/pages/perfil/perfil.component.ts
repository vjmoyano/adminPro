import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;

  public name:string;
  public email:string;
  public usuario : Usuario;
  public imagenSubir: File;
  public imgTemp : any = null

  constructor(private fb: FormBuilder, private userS: UsuarioService, private fileS:FileUploadService ) {

    this.usuario = this.userS.usuario;


  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre,Validators.required],
      email: [this.usuario.email,[Validators.required, Validators.email]],

    });

  }

  updatePerfil(){
    console.log(this.userS.usuario.uid);
    this.userS.updateUser(this.perfilForm.value, this.userS.usuario.uid)
      .subscribe( resp => {
        const {nombre, email} = this.perfilForm.value;
        this.userS.usuario.nombre = nombre;
        this.userS.usuario.email = email;

        Swal.fire('Guardado', 'Cambias guardados','success')
      }, (err) =>{
        Swal.fire('Error!', err.error.mensaje,'error')
        console.log(err.error.mensaje);
      } )
  }

  cambiarImagen(file: File){
    this.imagenSubir = file;
    console.log(file);

    if(!file){
      return this.imgTemp = null;
    }else{
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(file);

      reader.onloadend= () =>{
        console.log(reader.result);
        this.imgTemp = reader.result;
      }
    }


  }

  subirImagen(){
    this.fileS.actualizarFoto(this.imagenSubir, "usuarios", this.usuario.uid)
    .then( resp => {this.usuario.img=resp;
      Swal.fire('Guardado', 'Imagen Actualizada','success')
    } ).catch(
      (err)=>{
        Swal.fire('Error!', err.error.msg,'error')
      }
    )
  }



}
