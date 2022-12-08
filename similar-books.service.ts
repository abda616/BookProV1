import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGenure } from './genure';
@Injectable({
  providedIn: 'root'
})
export class SimilarBooksService {
public methodType:string=""

  constructor(private http :HttpClient) { }
  getSimilar(targetBook:string) :Observable<IGenure[]>{
    let _url=`http://176.28.209.55/recommendBySimilarBooks/${targetBook}/60?fbclid=IwAR26u86sL-C5d4AZMijiJQTzWQ4ab1ez_0Q1Wlzo7sM_HFjZ8XZEL-qfUYs`
return this.http.get<IGenure[]>(_url)
  }
  getByAuthor(targetAuthor:string):Observable<IGenure[]>{
    let url=`http://176.28.209.55/recommendByAuthor/J.K.%20Rowling,%20Mary%20GrandPr%C3%A9%20(Illustrator)/10?fbclid=IwAR0HO137iEK_3k4npZpWCuULPJ73es2HnOKt7XWN7FcUw6jsR5si4PTuYVU`
    return this.http.get<IGenure[]>(url)
  }
}
