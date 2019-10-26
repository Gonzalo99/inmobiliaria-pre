import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Inmueble } from '../../models/inmueble';
import { Imagenes } from '../../models/imagenes';
import { InmueblesService } from '../../services/inmuebles.service';
import { ImagenesService } from '../../services/imagenes.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: ['./inmueble.component.css'],
  providers: [ InmueblesService, ImagenesService ]
})

export class InmuebleComponent {

    public inmueble: Inmueble;
    public imagenes: Imagenes[];
    public url_global: string;
    public url_img: string;
    public contador: number; //Iterador carousel 

    ngOnInit() {
        
        this.getInmueble();

    }

    constructor(private _inmueblesService: InmueblesService, private _imagenesService: ImagenesService, private _route: ActivatedRoute, private _router: Router) {

        this.inmueble = new Inmueble(0, null, null, null, 0, 0, null, 0, null, false, 0, 0, false, false, null);
        this.url_global = GLOBAL.imagen;
        this.contador = 0;

    }

    //Avanza imagen en el carousel
    avanzar() {

        if (this.contador == this.imagenes.length -1) {

            this.contador = 0;
            this.url_img = this.imagenes[0].ruta;

        } else {

            this.contador++;
            this.url_img = this.imagenes[this.contador].ruta;

        }

    }

    //Retrocede imagen en el carousel
    retroceder() {

        if (this.contador == 0) {

            this.contador = this.imagenes.length -1;
            this.url_img = this.imagenes[this.contador].ruta;

        } else {

            this.contador--;
            this.url_img = this.imagenes[this.contador].ruta;

        }

    }

    //Metodo que se trae un inmueble de la base de datos
    getInmueble(){

		this._route.params.forEach((params: Params) => {
            let id = params['id'];
            
            this._inmueblesService.getInmueble(id).subscribe(
				response => {
					if(response['code'] == 200){

                        this.inmueble = response['data'];
                        console.log("Inmueble conseguido con exito");

                        //Consiguiendo imagenes
                        this.getImagenes(this.inmueble.id);

                        //Actualizando visitas
                        this.updateVisitas();

					}else{
                        
                        console.log("No se ha podido encontrar el inmueble");

					}
				},
				error => {
					console.log(<any>error);
				}
            );
            
        });

    }
    
    //Metodo que se trae las imagenes del inmueble de la base de datos
    getImagenes(code: number) {

        this._imagenesService.getImagesInmueble(code).subscribe(
            response => {
                if(response['code'] == 200){

                    this.imagenes = response['data'];
                    this.url_img = this.imagenes[0].ruta;
                    console.log("Imagenes conseguidas con exito");

                }else{
                    
                    console.log("No se ha podido encontrar las imagenes");

                }
            },
            error => {
                console.log(<any>error);
            }
        );

    }

    //Metodo que actualiza las visitas al inmueble
    updateVisitas() {

        let visitas = this.inmueble.visitas;
        visitas++;

        this._inmueblesService.updateVisitas(this.inmueble.id, visitas).subscribe(
            response => {
                if(response['code'] == 200){

                    console.log("Num visitas actualizada");

                }else{
                    
                    console.log("El numero de visitas no se ha podido actualizar");

                }
            },
            error => {
                console.log(<any>error);
            }
        );

    }

}