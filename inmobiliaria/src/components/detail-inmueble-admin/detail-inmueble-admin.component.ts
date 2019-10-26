import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Inmueble } from '../../models/inmueble';
import { Imagenes } from '../../models/imagenes';
import { InmueblesService } from '../../services/inmuebles.service';
import { ImagenesService } from '../../services/imagenes.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'detail-inmueble-admin',
  templateUrl: './detail-inmueble-admin.component.html',
  styleUrls: ['./detail-inmueble-admin.component.css'],
  providers: [ InmueblesService, ImagenesService ]
})

export class DetailInmuebleAdminComponent {

    public inmueble: Inmueble;
    public imagenes: Imagenes[];
    public url_img: string;

    ngOnInit() {

        this.getInmueble();

    }

    constructor(private _inmueblesService: InmueblesService, private _imagenesService: ImagenesService, private _route: ActivatedRoute, private _router: Router) {

        this.inmueble = new Inmueble(0, null, null, null, 0, 0, null, 0, null, false, 0, 0, false, false, null);
        this.url_img = GLOBAL.imagen;

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

}