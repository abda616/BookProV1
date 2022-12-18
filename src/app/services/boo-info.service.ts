import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenure} from "./Book/IGenure";
@Injectable({
  providedIn: 'root'
})
export class BooInfoService {
authorUrl=environment.apiUrl+"recommendByAuthor/";

  constructor(private http:HttpClient) { }
  getByAuthor(targetAuthor:string):Observable<any[]>{
    this.authorUrl=this.authorUrl+targetAuthor;
  console.log(this.authorUrl)
return this.http.get<IGenure[]>(this.authorUrl);
  }
}
