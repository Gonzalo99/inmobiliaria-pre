import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Email } from '../models/email';

@Injectable()
export class EmailService {

  public url: string;

  constructor(private _http: HttpClient) {

    this.url = GLOBAL.url;

   }

   setEmail(email: Email) {
    let json = JSON.stringify(email);
    let params = 'json='+json;
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};


    return this._http.post(this.url+'/send-email', params, headers);

   }

}