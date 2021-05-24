import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  cantantes: string[] = ["Bad Bunny","J Balvin","Drake"];
  dataCantantes: number[]=[40000,25000,35000];
  chart1: string ="Reproducciones"

  futbolistas: string[] = ["CR7","Messi","Pele"];
  dataFutbolistas: number[]=[770,734,1283];
  chart2: string ="Goleadores"

  stats: string[] = ["Kills","Assists","Deaths"];
  dataStats: number[]=[2.4,14.4,4.2];
  chart3: string ="Vecsus's KDA"

  wrestlers: string[] = ["Kane","Undertaker","Shawn Michaels"];
  dataWrestlers: number[]=[46,40,40];
  chart4: string ="Eliminaciones Royal Rumble"



  constructor() { }

  ngOnInit(): void {
  }

}
