import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})

export class InformationComponent {

  lat: number = 38.652164;
  lng: number = -5.659561;

  public contador_admin: number;

  ngOnInit() {
    
  }

  constructor(private _router: Router) {

    this.contador_admin = 0;

  }

}