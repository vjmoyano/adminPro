import { ModalImagenService } from './../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { HospitalService } from './../../../services/hospital.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  hospitalesTemp: Hospital[] = []
  cargando: boolean = true;
  subscripImg: Subscription;

  constructor(private hospS: HospitalService, private imagenS: ModalImagenService,
    private busquedaS: BusquedasService) { }
  ngOnDestroy(): void {
    this.subscripImg.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarHospitales();
    this.subscripImg=this.imagenS.imagenSubida.pipe(
      delay(500)
    ).subscribe(img=>{
      console.log(img);
      this.cargarHospitales();
    })
  }

  cargarHospitales(){
    this.cargando=true;
    this.hospS.cargarHospitales().subscribe(hospitales=>{
      this.hospitales = hospitales;
      this.cargando=false;
      this.hospitalesTemp = hospitales;
      console.log(this.hospitales)
    });
  }

  save(hospital: Hospital){
    this.hospS.actualizarHospital(hospital.nombre, hospital._id).subscribe(resp=>{
      Swal.fire('Actualizado', hospital.nombre, 'success');
    })
    console.log(hospital);
  }

  eliminar(hospital: Hospital){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Vas a eliminar al hospital " + hospital.nombre,
      icon: 'question',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.value) {
        this.hospS.eliminarHospital(hospital._id).subscribe((data)=>{
          Swal.fire('Hospital Borrado', `El hospital ${hospital.nombre} se eliminó de forma correcta`, 'success');
          this.cargarHospitales()
        })
      }
    })
    console.log(hospital);
  }

  async abrirCrear(){

    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })

    if (value.trim().length>0) {
      this.hospS.crearHospital(value).subscribe(
        (data:any)=>{
          this.hospitales.push(data);

        }
      )
    }

  }

  abrirModalImagen(hospital: Hospital){
    this.imagenS.abrirModal('hospitales',hospital._id, hospital.img);
  }

  buscar(termino:string){
    if(termino.length<1){
      return this.hospitales = this.hospitalesTemp;
    }
    console.log(termino);
    this.busquedaS.busqueda('hospitales',termino).subscribe((data: Hospital[])=>{
      this.hospitales = data;
    })
  }

}
