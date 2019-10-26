import { Component } from '@angular/core';

@Component({
  selector: 'legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})

export class LegalComponent {

  constructor() {

  }

  ngOnInit() {
      console.log("Se ha cargado el componente Legal");
  }

}