import { Component,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  public formSubmitted = false;

  constructor(private fb: FormBuilder, private userService: UsuarioService, private router: Router ) { }

  public registerForm = this.fb.group({
    nombre: ['Vecsus', [Validators.required, Validators.minLength(5)]],
    email: ['vecsus@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [false, Validators.required],
  }, {
    validators: this.equalPasswords('password','password2')
  });

  crearUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.valid){
      this.userService.crearUsuario(this.registerForm.value).subscribe(resp=>{
        this.router.navigateByUrl('/');
      },(err)=>{
        //si se da un error
        console.warn(err.error.message);
        Swal.fire('Error', err.error.message, 'error');
      });
    }else{
      return ;

    }

  }

  campoNoValido(campo: string): boolean{

    if(this.registerForm.get(campo).invalid && this.formSubmitted){
        return true;
    }else{
      return false;
    }

  }
  aceptarTerminos(): boolean{
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passInvalids(){
    const pass = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if(pass!==pass2 && this.formSubmitted){
      return true;
    }else{
      return false;
    }

  }

  equalPasswords(pass1:string, pass2:string){

    return (formGroup: FormGroup) =>{

      const pass1Control =  formGroup.get(pass1);
      const pass2Control =  formGroup.get(pass2);

      if(pass1Control.value === pass2Control.value){
        pass1Control.setErrors(null);
      }else{
        pass1Control.setErrors({notEqual : true});
      }

    }

  }

}
