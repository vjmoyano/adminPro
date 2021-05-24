import { Component,  NgZone,  OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent  implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private userS: UsuarioService, private ngZone: NgZone) {


   }
  ngOnInit(): void {
    this.renderButton();
  }

   public submitted = false;
   public auth2: any;

   public loginForm =  this.fb.group({
       email: [localStorage.getItem('email') || " ", [Validators.required]],
       password: ['', [Validators.required]],
       remember: [false]
   });

  login(){

    if(this.loginForm.valid) {
      this.userS.loginUsuario(this.loginForm.value).subscribe(resp=>{
        console.log("Login exitoso");
        console.log(resp);
        if(this.loginForm.get('remember').value){
          localStorage.setItem('email', this.loginForm.get('email').value );
        }else{
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');
      },(err)=>{
        console.warn(err);
        Swal.fire('Error', err.error.mensaje, 'error');
      })
    }else{
      return ;

    }
    // this.router.navigate(['/dashboard']);
  }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // 'onsuccess': this.onSuccess,
      // 'onfailure': this.onFailure
    });

    this.startApp();

  }

  startApp(){
  gapi.load('auth2',()=>{
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    this.auth2 = gapi.auth2.init({
      client_id: '787408917127-maqoeqaio7fl50hq2atsc704o6uae0hm.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
    });
    this.attachSignin(document.getElementById('my-signin2'));
  });
}

attachSignin(element) {
  console.log(element.id);
  this.auth2.attachClickHandler(element, {},
      (googleUser) =>{
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        this.userS.loginGoogle(id_token).subscribe(resp=>{
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
        // al dashboard

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
}

}
