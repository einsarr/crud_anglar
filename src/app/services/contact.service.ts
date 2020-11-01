import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public host:string="http://localhost:8080";
  constructor(private http:HttpClient) { }

  public getContacts(url){
    return this.http.get(this.host+url)
  }

  public postContact(url,data){
    return this.http.post(this.host+url,data);
  }
}
