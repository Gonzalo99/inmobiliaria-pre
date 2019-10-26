import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Inmueble } from '../models/inmueble';
import { Promise, reject } from 'q';

@Injectable()
export class InmueblesService {

  public url: string;

  constructor(private _http: HttpClient) {

    this.url = GLOBAL.url;

   }

   getInmubles() {

    return this._http.get(this.url + '/inmuebles');

   }

   getInmueblesOferta() {

    return this._http.get(this.url + '/inmuebles-oferta');

   }

   getInmueble(id: number) {

    return this._http.get(this.url+'/inmueble/'+id);

   }

   addInmueble(inmueble: Inmueble) {

    let json = JSON.stringify(inmueble);
    let params = 'json='+json;
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};

    return this._http.post(this.url+'/inmueble', params, headers);

   }

   updateVisitas(id: number, num: number) {

    return this._http.get(this.url+'/update-visitas/' + id + '/' + num);

   }

   updateFirstImg(id: number, ruta: string) {

    return this._http.get(this.url+'/update-first_img-inmueble/' + id + '/' + ruta);

   }

   getLastId() {

    return this._http.get(this.url+'/last-inmueble-id');

   }

   makeFileRequest(url: string, params: Array<String>, files: Array<File>) {

      return Promise((resolve, reject)=>{
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();

        for(var i = 0; i < files.length; i++){
          formData.append('imagen', files[i], files[i].name);
        }

        xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              resolve(JSON.parse(xhr.response));
            }else{
              reject(xhr.response);
            }
          }
        };

        xhr.open("POST", url, true);
			  xhr.send(formData);

      });

   }

   deleteInmueble(id: number) {

    return this._http.get(this.url+'/eliminar-inmueble/' + id);

   }

   updateInmmueble(inmueble: Inmueble, id: number) {

    let json = JSON.stringify(inmueble);
    let params = 'json='+json;
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};

    return this._http.post(this.url+'/update-inmueble/' + id, params, headers);

   }

}