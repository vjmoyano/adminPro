import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import {retry, take, map, filter} from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {



    // this.observab().pipe(
    //   retry(1)
    // ).subscribe(

    //   valor => console.log('subs: ', valor),
    //   (err)=> console.warn("se equivoco xd: ",err),
    //   () => console.log('se completo: '),


    // );

    this.intervalSubs=this.returnInter().subscribe((valor)=>console.log(valor)); //.subscribe(console.log) es lo mismo


  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {



  }

  returnInter(){

    return interval(500)
                      .pipe(

                              map(valor=>{
                                 valor+1; //map hace return
                              })
                            );


  }

  observab(): Observable<string> {
    const obs$ = new Observable<string>( observer =>{

      let x =0;

      const interval = setInterval(()=>{

         observer.next("dale mi Barce");
         x++;
         if(x===12){
          clearInterval(interval);
          observer.complete();
        }else if(x==10){
          observer.error('me caí xd');
        }

      },1000)

  } );

  return obs$;
  }

}
