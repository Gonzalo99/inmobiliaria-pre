import { Component } from '@angular/core';
import { Inmueble } from '../../models/inmueble';
import { Admin } from '../../models/admin';
import { AdminService } from '../../services/admin.services';
import { InmueblesService } from '../../services/inmuebles.service';
import { ImagenesService } from '../../services/imagenes.service';
import { GLOBAL } from '../../services/global';
import { Imagenes } from '../../models/imagenes';

declare var $:any;

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ AdminService, InmueblesService, ImagenesService ]
})

export class AdminComponent {

  public usuario: string;
  public passwd: string;
  public admin: Admin;
  public open_admin: Admin;

  //Variables addInmueble
  public new_inmueble: Inmueble;
  public filesToUpload;
  public resultUpload;
  public array_images = [];
  public inmuebles;
  public num_imagenes: number; //Variable que guarda el numero de imagenes con las que se va a crear el inmueble
  public b_oferta;
  public b_ascensor;
  public b_garaje;

  public confirmado; //Variable para confirmar al borrar
  public contador: number;

  filterOferta = '';

    ngOnInit() {

        this.getAdmin();
        $('.btn-addInmueble').click();

        this.getInmuebles();

    }

  constructor(private _adminService: AdminService, private _inmueblesService: InmueblesService, private _imagenesService: ImagenesService) {

    this.usuario = null;
    this.passwd = null;
    this.open_admin = new Admin(0, null, null, false);
    this.new_inmueble = new Inmueble(0, null, null, null, 0, 0, null, 0, null, false, 0, 0, false, false, null);
    this.array_images = new Array<String>();
    this.inmuebles = new Array<Inmueble>();
    this.num_imagenes = 0;
    this.confirmado = null;
    this.contador = 0;

  }

  //Se trae los valores del admin de la BD
  getAdmin() {

    this._adminService.getAdmin().subscribe(
      response => {
          if(response['code'] == 200){

              console.log("Admin conseguido con exito");
              this.admin = response['data'];

              //Comprueba si el usuario tiene que pasar el control de acceso
              if (this.admin.active == false) {

                $('.control').click();

              } else {

                console.log('La session no se cerro');

              }

          }else{
              
              console.log("Admin no conseguido");

          }
      },
      error => {
          console.log(<any>error);
      }
    );

  }

  //Metodo que inicia sesion
  openSession() {

    this.open_admin.id = this.admin.id;
    this.open_admin.usuario = this.usuario;
    this.open_admin.passwd = this.passwd;

    this._adminService.startSession(this.open_admin).subscribe(
      response => {
          if(response['code'] == 200){

              console.log("Iniciada session con exito");
              
              $('.modal').modal('toggle'); 

              this._adminService.updateActive(true).subscribe(
                response => {
                    if(response['code'] == 200){
          
                        console.log(response['message']);
          
                    }else{
                        
                        console.log(response['message']);
                        
                    }
                },
                error => {
                    console.log(<any>error);
                }
              );

          }else{
              
            console.log("No se ha podido iniciar session");
            $('.error-login').css("visibility", "visible");

          }
      },
      error => {
          console.log(<any>error);
      }
    );

  }

  //Metodo que cierra session
  closeSession() {

    this._adminService.updateActive(false).subscribe(
      response => {
          if(response['code'] == 200){

              console.log(response['message']);

              $('.control').click();

          }else{
              
              console.log(response['message']);
              
          }
      },
      error => {
          console.log(<any>error);
      }
    );

    this.usuario = null;
    this.passwd = null;

  }

  //Metodo que guarda un inmuble en la BD
  addInmueble() {

    this.conversorBoolean();

    this._inmueblesService.addInmueble(this.new_inmueble).subscribe(
      response => {
          if(response['code'] == 200){

              console.log("Inmueble creado con exito");

              //Si contiene imagenes
              if (this.array_images.length != 0) {
                this.getIdInmueble();
              } else {
                console.log("No hay imagenes que añadir");
              }
        

          }else{
              
              console.log("No se ha podido crear el inmueble");
              
          }
      },
      error => {
          console.log(<any>error);
      }
    );

  }

  //Convierte de string a boolean
  conversorBoolean() {

    //Oferta
    if (this.b_oferta == "true") {
      this.new_inmueble.oferta = true;
    } else {
      this.new_inmueble.oferta = false;
    }

    //Garaje
    if (this.b_garaje == "true") {
      this.new_inmueble.garaje = true;
    } else {
      this.new_inmueble.garaje = false;
    }

    //Ascensor
    if (this.b_ascensor == "true") {
      this.new_inmueble.ascensor = true;
    } else {
      this.new_inmueble.ascensor = false;
    }

  }

  //Metodo que guarda foto en el backend
  addFoto() {

    this._inmueblesService.makeFileRequest(GLOBAL.url + '/upload-file', [], this.filesToUpload).then((result) => {
      
      console.log(result);

      //Condicional que se encarga de que esta accion solo se realice una vez
      if (this.num_imagenes == 0) {

        this.new_inmueble.first_img = this.filesToUpload[0].name;
        
      }

      //Añadimos la ruta de la foto al array de imagenes
      this.array_images.push(this.filesToUpload[0].name);

      //Añade icono de check
      $('.imagenes-add').append("<img class='float-left mr-2 img-fluid' src='../assets/images/check.svg' height='30' width='30'>");

      this.num_imagenes++;

    }, (error) => {

      console.log(error);

    });
    
  }

  //Metodo que recoge el fichero desde la interfaz
  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
    
    this.addFoto();
  }

  //Metodo que crea una pausa
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Metodo asincrono que permite llamar a delay y dormir la hebra
  private async sleep() {
    
    // Sleep thread for 2 seconds
    await this.delay(2000);
    
  }

  //Metodo que obtiene el ultimo id de los inmuebles
  getIdInmueble() {

    this._inmueblesService.getLastId().subscribe(
      response => {
          if(response['code'] == 200){

              let code = response['data'].id;

              //Llamada iterativa para añadir las distintas fotos del piso
              for (let i = 0; i < this.array_images.length; i++) {
                this.addFotoBD(code, this.array_images[i]);
                
                this.sleep(); //Pausa para que no se adelanten las ejecuciones
               
              }

              //Limpiamos valores
              this.cleanValues();

              //Cerramos el div
              $('.btn-addInmueble').click();
             
              //Mostramos un aviso
              $('.alert').css('visibility', 'visible');

              //Recargamos la vista
              this.getInmuebles();

          }else{
              
              console.log("No se ha podido conseguir el id");
              
          }
      },
      error => {
          console.log(<any>error);
      }
    );

  }

  //Metodo que añade foto a la base de datos
  addFotoBD(code: number, ruta: string){

    var imagen = new Imagenes(0, code, ruta);

    this._imagenesService.addImagen(imagen).subscribe(
      response => {
          if(response['code'] == 200){

              console.log("Imagen creada con exito");

          }else{
              
              console.log("No se ha podido crear la imagen");
              
          }
      },
      error => {
          console.log(<any>error);
      }
    );

  }

  //Metodo que limpia los valores de las variables de creación de inmueble
  cleanValues() {

    console.log("Llamando metodo cleanValues");

    this.new_inmueble.id = 0;
    this.new_inmueble.titulo = null;
    this.new_inmueble.tipo = null;
    this.new_inmueble.precio = 0;
    this.new_inmueble.planta = 0;
    this.new_inmueble.oferta = false;
    this.new_inmueble.metros = 0;
    this.new_inmueble.garaje = false;
    this.new_inmueble.first_img = null;
    this.new_inmueble.estado = null;
    this.new_inmueble.direccion = null;
    this.new_inmueble.contenido = null;
    this.new_inmueble.ascensor = null;
    this.new_inmueble.antiguedad = 0;
                        
    //Borramos elementos del vector de imagenes
    for (let i = this.array_images.length; i > 0; i--) {
      this.array_images.splice(i-1, 1);
    }

  }

  //Metodo que trae de la BD los inmuebles
  getInmuebles() {

    this._inmueblesService.getInmubles().subscribe(
      response => {
          if(response['code'] == 200){

              console.log("Inmuebles conseguidos con exito");
              this.inmuebles = response['data'];

          }else{
              
              console.log("No se ha podido conseguir los inmuebles");
              
          }
      },
      error => {
          console.log(<any>error);
      }
    );

  }

  borrarConfirm(id){
		this.confirmado = id;
	}

	cancelarConfirm(){
		this.confirmado = null;
	}


	onDeleteInmueble(id: number){

    this._imagenesService.getImagesInmueble(id).subscribe(
      response => {
          if(response['code'] == 200){

            let imagenes_delete = new Array<Imagenes>();
            imagenes_delete = response['data'];

            //Elimina imagenes del directorio
            for (let i = 0; i < imagenes_delete.length; i++) {

              this._imagenesService.deleteImagenesDir(imagenes_delete[i].ruta).subscribe(
                response => {
                    if(response['code'] == 200){
          
                      console.log(response['message']);
          
                    }else{
                        
                      console.log(response['message']);
                        
                    }
                },
                error => {
                    console.log(<any>error);
                }
              );

            }

          }else{
              
            console.log("No se han podido conseguir las imagenes.");
              
          }
      },
      error => {
          console.log(<any>error);
      }
    );
    
    //Elimina imagenes del inmueble de la BD
    this._imagenesService.deleteImagesBD(id).subscribe(
      response => {
          if(response['code'] == 200){

            console.log(response['message']);

            //Elimina inmueble
            this._inmueblesService.deleteInmueble(id).subscribe(
              response => {
                  if(response['code'] == 200){

                    console.log("Inmueble eliminado con exito");

                    //Traemos los inmuebles de nuevo para actualizar la vista
                    this.getInmuebles();

                  }else{
                      
                    console.log("No se ha podido eliminar");
                      
                  }
              },
              error => {
                  console.log(<any>error);
              }
            );

          }else{
              
            console.log(response['message']);
              
          }
      },
      error => {
          console.log(<any>error);
      }
    );

	}

}