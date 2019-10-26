import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from '../models/admin';
import { GLOBAL } from './global';

@Injectable()
export class AdminService {

  public url: string;

  constructor(private _http: HttpClient) {

    this.url = GLOBAL.url;

   }

   getAdmin() {

    return this._http.get(this.url+'/admin');

   }

   startSession(admin: Admin) {

    let json = JSON.stringify(admin);
    let params = 'json='+json;
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};

    return this._http.post(this.url+'/verifyPasswd', params, headers);

   }

   updateActive(estado: boolean) {

    return this._http.get(this.url+'/update-active-admin/' + estado);

   }

}