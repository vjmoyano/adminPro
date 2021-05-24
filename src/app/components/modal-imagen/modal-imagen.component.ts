import { Usuario } from './../../models/usuario.model';
import { ModalImagenService } from './../../services/modal-imagen.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imgTemp : any = null
  public imagenSubir: File;
  usuario: Usuario

  constructor(public imagenS: ModalImagenService, private fileS:FileUploadService, private userS: UsuarioService) { }



  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp=null;
    this.imagenS.cerrarModal();
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
    this.fileS.actualizarFoto(this.imagenSubir, this.imagenS.tipo, this.imagenS.id)
    .then( resp => {
      Swal.fire('Guardado', 'Imagen Actualizada','success');
      this.imagenS.imagenSubida.emit(resp);
      this.cerrarModal();
    } ).catch(
      (err)=>{
        Swal.fire('Error!', err.error.msg,'error')
      }
    )
  }

}
