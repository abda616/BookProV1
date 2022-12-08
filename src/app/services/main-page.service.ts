import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenure} from "./IGenure";

@Injectable({providedIn: 'root'})

export class MainPageService implements IGenure{
  constructor(private http: HttpClient) {}
  response: any[];
  getMostRated(): Observable<any[]> {
    console.log(this.http.get<IGenure[]>(`${environment.apiUrl}mostRated/10`));
    return this.http.get<IGenure[]>(`${environment.apiUrl}mostRated/10`);
  }
  getSimilar(targetBook: string): Observable<IGenure[]> {
    let _url = `${environment.apiUrl}recommendBySimilarBooks/${targetBook}/60?fbclid=IwAR26u86sL-C5d4AZMijiJQTzWQ4ab1ez_0Q1Wlzo7sM_HFjZ8XZEL-qfUYs`
    return this.http.get<IGenure[]>(_url)
  }
  getByAuthor(targetAuthor: string): Observable<IGenure[]> {
    let url = `${environment.apiUrl}recommendByAuthor/J.K.%20Rowling,%20Mary%20GrandPr%C3%A9%20(Illustrator)/10?fbclid=IwAR0HO137iEK_3k4npZpWCuULPJ73es2HnOKt7XWN7FcUw6jsR5si4PTuYVU`
    return this.http.get<IGenure[]>(url)
  }


}
