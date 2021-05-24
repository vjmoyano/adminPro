import { environment } from 'src/environments/environment';

const api_url = environment.base_url

export class Usuario{

  constructor(

    public nombre: string,
    public email: string,
    public img?: string,
    public role?: string,

    public pass?: string,
    public uid?: string,
    public google?: boolean,
  ){

  }

  get imagenUrl(){

    if(!this.img){
      return `${api_url}/uploads/usuarios/no-image`;
    }

    else if(this.img.includes("http")){
      return this.img
    }
    else if(this.img){
    return `${api_url}/uploads/usuarios/${this.img}`;
    }else{
      return `${api_url}/uploads/usuarios/no-image`;
    }

  }

  get nombreUser(){
    return this.nombre;
  }

  get emailUser(){
    return this.email;
  }

}
