import { Component } from '@angular/core';
import { Inmueble } from '../../models/inmueble';
import { InmueblesService } from '../../services/inmuebles.service';
import { GLOBAL } from '../../services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css'],
  providers: [ InmueblesService] 
})

export class InmueblesComponent {

  public status_filtro: boolean;
  public inmuebles: Inmueble[];
  public inmuebles_oferta: Inmueble[];
  public url_img: string;
  public active_admin: boolean;
  public passwd_admin: string;

  //Filtros
  filterTipo = '';
  filterEstado = '';
  filterTitulo = '';

  ngOnInit() {
      this.getInmubles();
      this.getInmueblesOferta();
  }

  constructor(private _inmublesService: InmueblesService, private _router: Router) {

    this.status_filtro = false;
    this.url_img = GLOBAL.imagen;
    this.active_admin = false;

  }

  //Metodo que activa o desactiva la posibilidad de filtrar los inmuebles
  active_filtro() {
    
    if ( this.status_filtro == true ) {
      
      this.status_filtro = false;

    } else {

      this.status_filtro = true;

    }

  }

  //Metodo que muestra o esconde la opcion admin
  activeAdmin() {

    if (this.active_admin == false) {
      this.active_admin = true;
    } else {
      this.active_admin = false;
    }

  }

  //Redirige al componente admin
  enterAdmin() {

    if (this.passwd_admin = "admin") {
      this._router.navigate(['/admin']);
    }

  }

  //Metodo que se trae de la BD los inmubles
  getInmubles() {

    this._inmublesService.getInmubles().subscribe(
      result => {

        if (result['code'] != 200) {

          console.log("Se ha ha producido un error");

        } else {

          this.inmuebles = result['data'];
          console.log("Inmubles conseguidos con exito:");

        }

      },
      error => {
        console.log(<any>error);
      }
    );

  }

  //Metodo que se trae de la base de datos los inmuebles en oferta
  getInmueblesOferta() {

    this._inmublesService.getInmueblesOferta().subscribe(
      result => {

        if (result['code'] != 200) {

          console.log("Se ha ha producido un error");

        } else {

          this.inmuebles_oferta = result['data'];
          console.log("Inmubles oferta conseguidos con exito: " + this.inmuebles_oferta.length);
          
        }

      },
      error => {
        console.log(<any>error);
      }
    );

  }

}