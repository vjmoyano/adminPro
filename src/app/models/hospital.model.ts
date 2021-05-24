import { environment } from 'src/environments/environment';
interface _HospitalUser{
  nombre: string,
  _id: string,
  img: string
}

const api_url = environment.base_url

export class Hospital{

  constructor(

    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: _HospitalUser,


  ){

  }

  // get imagenUrl(){

  //   if(!this.img){
  //     return `${api_url}/uploads/usuarios/no-image`;
  //   }

  //   else if(this.img.includes("http")){
  //     return this.img
  //   }
  //   else if(this.img){
  //   return `${api_url}/uploads/usuarios/${this.img}`;
  //   }else{
  //     return `${api_url}/uploads/usuarios/no-image`;
  //   }

  // }

}
