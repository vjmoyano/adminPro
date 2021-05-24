import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;
  public imagenSubida: EventEmitter<string> = new EventEmitter<string>()

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo:'usuarios'|'medicos'|'hospitales', id:string, imgA:string="no-img"){
    this._ocultarModal=false;
    this.tipo = tipo;
    this.id = id;


    if(imgA.includes('https')){
      this.img = imgA;
    }else{
      this.img = `${base_url}/uploads/${tipo}/${imgA}`
    }


  }

  cerrarModal(){
    this._ocultarModal=true;
  }

  constructor() { }

}
