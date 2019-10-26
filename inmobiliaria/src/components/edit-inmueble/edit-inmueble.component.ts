import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Inmueble } from '../../models/inmueble';
import { Imagenes } from '../../models/imagenes';
import { InmueblesService } from '../../services/inmuebles.service';
import { ImagenesService } from '../../services/imagenes.service';
import { GLOBAL } from '../../services/global';

declare var $:any;

@Component({
  selector: 'edit-inmueble',
  templateUrl: './edit-inmueble.component.html',
  styleUrls: ['./edit-inmueble.component.css'],
  providers: [ InmueblesService, ImagenesService ]
})

export class EditInmuebleComponent {

    public inmueble: Inmueble;
    public imagen: Imagenes;
    public imagenes: Imagenes[];
    public url_img: string;
    public id_inmueble: number;
    public num_imagenes: number;

    public filesToUpload;
    public resultUpload;

    ngOnInit() {

        this._route.params.forEach((params: Params) => {
            this.id_inmueble = params['id'];
        });  

        this.getInmueble();
    }

    constructor(private _inmueblesService: InmueblesService, private _imagenesService: ImagenesService, private _route: ActivatedRoute, private _router: Router) {

        this.inmueble = new Inmueble(0, null, null, null, 0, 0, null, 0, null, false, 0, 0, false, false, null);
        this.imagen = new Imagenes(0, 0, null);
        this.url_img = GLOBAL.imagen;
        this.num_imagenes = 0;

    }

    //Metodo que se trae un inmueble de la base de datos
    getInmueble(){
            
        this._inmueblesService.getInmueble(this.id_inmueble).subscribe(
            response => {
                if(response['code'] == 200){

                    this.inmueble = response['data'];
                    console.log(this.inmueble);
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
            
        

    }
    
    //Metodo que se trae las imagenes del inmueble de la base de datos
    getImagenes(code: number) {

        this._imagenesService.getImagesInmueble(code).subscribe(
            response => {
                if(response['code'] == 200){

                    this.imagenes = response['data'];
                    this.num_imagenes = this.imagenes.length;
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

    //Elimina imagen
    deleteImagen(id: number, ruta: string) {

        console.log("Llamando metodo deleteImagen: " + ruta);

        this._imagenesService.deleteImagenesDir(ruta).subscribe(
            response => {
                if(response['code'] == 200){

                    console.log("Imagen eliminada del directorio exito");

                }else{
                    
                    console.log("No se ha podido eliminar la imagen del directorio");

                }
            },
            error => {
                console.log(<any>error);
            }
        );

        this._imagenesService.deleteImageBD(id).subscribe(
            response => {
                if(response['code'] == 200){

                    console.log("Imagen eliminada con exito");

                    //Actualizar la vista
                    this.getImagenes(this.inmueble.id);

                }else{
                    
                    console.log("No se ha podido eliminar la imagen");

                }
            },
            error => {
                console.log(<any>error);
            }
        );

        if ( this.num_imagenes == 1  ) {

            this._inmueblesService.updateFirstImg(this.id_inmueble, null).subscribe(
                response => {
                    if(response['code'] == 200){
    
                        console.log("First_img actualizada con exito");
    
                    }else{
                        
                        console.log("First_img no se ha podido actualizar");
    
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );

        }

    }

    //Metodo que recoge el fichero desde la interfaz
    fileChangeEvent(fileInput: any){
        
        this.filesToUpload = <Array<File>>fileInput.target.files;

        this.addFoto();
    }

    //Metodo que guarda foto en el backend
  addFoto() {

    this._inmueblesService.makeFileRequest(GLOBAL.url + '/upload-file', [], this.filesToUpload).then((result) => {
        

      if (result['code'] == 200) {

        //Condicional que se encarga de que esta accion solo se realice una vez
        if (this.num_imagenes == 0) {
            let ruta = this.filesToUpload[0].name;
            this._inmueblesService.updateFirstImg(this.id_inmueble, ruta).subscribe(
                response => {
                    if(response['code'] == 200){

                        console.log("First_img actualizada con exito");

                    }else{
                        
                        console.log("First_img no se ha podido actualizar");

                    }
                },
                error => {
                    console.log(<any>error);
                }
            );

        }

        //Compone imagen
        this.imagen.code = this.id_inmueble;
        this.imagen.ruta = this.filesToUpload[0].name;

        //Añade foto a la BD
        this._imagenesService.addImagen(this.imagen).subscribe(
            response => {
                if(response['code'] == 200){

                    console.log("Imagen BD insertada con exito");

                    //Actualizar la vista
                    this.getImagenes(this.inmueble.id);

                    $('.correct-img').css("visibility", "visible");

                }else{
                    
                    console.log("Imagen BD no se ha podido inserta");

                }
            },
            error => {
                console.log(<any>error);
            }
        );

      } else {

        console.log(result['message']);

      }

    }, (error) => {

      console.log(error);

    });
    
  }

  //Metodo que actualiza los campos inmueble
  updateInmueble() {

    this._inmueblesService.updateInmmueble(this.inmueble, this.id_inmueble).subscribe(
        response => {
            if(response['code'] == 200){

                console.log("Inmueble actualizado con exito");

                $('.alert-1').css("visibility", "visible");

            }else{
                
                console.log("El inmueble no se ha podido actualizar");
                $('.alert-2').css("visibility", "visible");

            }
        },
        error => {
            console.log(<any>error);
        }
    );

  }

}