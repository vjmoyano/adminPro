import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  @Input() labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() datos: number[];
  @Input() titulo: string;

  public colors: Color[] = [
    {backgroundColor: ['#301b3f','#387c6d','#343f56']}
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
