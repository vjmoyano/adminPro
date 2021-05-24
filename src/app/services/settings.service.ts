import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  theme: string = "green-dark";
  style = document.querySelector("#theme");


  constructor() {
    const url = localStorage.getItem("theme") || "./assets/css/colors/purple-dark.css"

    this.style.setAttribute("href",url)
   }

   changeTheme(theme: string){

    this.style.setAttribute("href",`./assets/css/colors/${theme}.css`)
    localStorage.setItem("theme",`./assets/css/colors/${theme}.css`)


    }

    working(){

      const links = document.querySelectorAll(".selector")



        links.forEach( link=>{
        link.classList.remove("working");
        const theme = link.getAttribute("data-theme");
        const url = `./assets/css/colors/${theme}.css`;
        const actual = localStorage.getItem("theme");
        if(actual===url){
          link.classList.add("working");
        }
      } )

    }


}
