import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {retry, take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  pagina: string;
  public titulosSubs$: Subscription;

  constructor(private router:Router, private route: ActivatedRoute) {

    //route.snapshot.children[0].data

    this.titulosSubs$=this.getRutas().subscribe(({titulo})=>{
      this.pagina=titulo;
      document.title = "Admin-Pro" + titulo;
    }
    );

  }
  ngOnDestroy(): void {
    this.titulosSubs$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getRutas(){
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter((event:ActivationEnd) => event.snapshot.firstChild==null),
      map((event:ActivationEnd)=>event.snapshot.data)
  )}

}
