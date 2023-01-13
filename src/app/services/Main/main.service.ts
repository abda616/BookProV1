import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../shared/Interfaces/Book";
import {environment} from "../../../environments/environment.prod";
import {IGenure} from "../../shared/Interfaces/IGenure";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { }

  basedInYourInterst(){
    return this.http.get<Book[]>(`${environment.apiUrl}home/basedOnYourInterests`)
  }
  topBook(){
    return this.http.get<Book[]>(`${environment.apiUrl}home/top10`)

  }
  basedOnSimUser(){
    return this.http.get<Book[]>(`${environment.apiUrl}home/recommendBySimilarUsers`)
  }

  searchBy(targetSearch: string,targetType:string) {
    let baseSearchUrl = environment.apiUrl + "search"
    return this.http.get<IGenure[]>(`${baseSearchUrl}`+`?domain=${targetType}&query=${targetSearch}`)
  }
}
