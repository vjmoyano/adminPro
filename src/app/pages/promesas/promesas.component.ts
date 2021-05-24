import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsers().then(users =>{
      console.log(users);
    })

    // const promesa = new Promise( (resolve, reject) => {S

    //   if(false){
    //     resolve('hola mundo');
    //   }else{
    //     reject('salio mal');
    //   }



    // } );


    // promesa.then( (res) => {
    //     console.log(res);
    // } ).catch((error) => {
    //   console.log(error) } );

    // console.log("fin del init");

  }

  getUsers(){

    const promisa = new Promise(resolve=>{

      fetch('https://reqres.in/api/users')
      .then((res) => res.json()).
      then(body => {console.log(body.data)})

    })

    return promisa;

  }

}
