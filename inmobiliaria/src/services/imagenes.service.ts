import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Imagenes } from '../models/imagenes';

@Injectable()
export class ImagenesService {

  public url: string;

  constructor(private _http: HttpClient) {

    this.url = GLOBAL.url;

   }

   getImagesInmueble(code: number) {
    return this._http.get(this.url+'/imagenes/'+code);
   }

   addImagen(imagen: Imagenes) {

    let json = JSON.stringify(imagen);
    let params = 'json='+json;
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};

    return this._http.post(this.url+'/imagen', params, headers);

   }

   deleteImagesBD(code: number) {

    return this._http.get(this.url+'/delete-imagenes/' + code);

   }

   deleteImageBD(id: number) {

    return this._http.get(this.url+'/delete-imagen/' + id);

   }

   deleteImagenesDir(name: string) {

    return this._http.get(this.url+'/delete-imagenes-dir/' + name);

   }

}   