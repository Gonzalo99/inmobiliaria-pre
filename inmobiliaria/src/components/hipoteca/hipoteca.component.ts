import { Component } from '@angular/core';
import {Chart} from 'chart.js';

declare var $: any;

@Component({
  selector: 'hipoteca',
  templateUrl: './hipoteca.component.html',
  styleUrls: ['./hipoteca.component.css']
})

export class HipotecaComponent {

    public prestamo: number;
    public interes: number;
    public years: number;
    public hipoteca: number;

    public LineChart=[];

    ngOnInit() {

      // Line chart:
      this.LineChart = new Chart('lineChart', {
        type: 'line',
      data: {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio","Agosto","Septiembre"],
      datasets: [{
          label: '',
          data: [-0.116, -0.108, -0.109, -0.112, -0.134, -0.190, -0.283, -0.356, -0.339],
          fill:true,
          lineTension:0.2,
          borderColor:"red",
          borderWidth: 1
      }]
      }, 
      options: {
      title:{
          text:"Euribor 2019",
          display:true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
      }
      });


    }

    constructor() {

      this.prestamo = 0;
      this.years = 0;
      this.interes = 0;
      this.hipoteca = 0;

    }

    calculoHipoteca() {

      var n = this.years * 12;
      var i = this.interes / 12;

      /*Apartado 1*/
      var dividendo1 = Math.pow(1 + (i/100), n) * (i/100);
      console.log(dividendo1);

      /*Apartado 2*/
      var dividendo2 = Math.pow(1 + (i/100), n) - 1;
      console.log(dividendo2);

      /*Apartado 3*/
      var sumando = dividendo1 / dividendo2;

      this.hipoteca =  Math.round( sumando * this.prestamo );

      $('.hipoteca').css('visibility', 'visible');

    }

}