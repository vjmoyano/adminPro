import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input('progreso') progres:number = 50;
  @Input('clase') btnClass:string = "btn btn-primary";

  @Output() changeValue: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor:number){

      if(this.progres>=100 && valor >=0){
        this.changeValue.emit(100);
        return this.progres = 100;
      }
      if(this.progres<=0 && valor <=0){
        this.changeValue.emit(0);
        return this.progres = 0;
      }

      this.progres = this.progres + valor;
      this.changeValue.emit(this.progres);


  }
  onChange(valor: number){

    if(valor>=100){
      this.progres=100
    }else if(valor<=0){
      this.progres=0
    } else{
      this.progres=valor;
    }

    this.changeValue.emit(valor);



  }

  constructor() { }

  ngOnInit() {
    this.btnClass = `btn + ${this.btnClass}`;
  }

}
