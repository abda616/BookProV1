import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {IGenure} from '../shared/Interfaces/IGenure';

@Injectable({providedIn: 'root'})
export class SearchPageService {
  baseSearchUrl = environment.apiUrl + "python/search/"
  html = ""
  targetedUrl = "https://www.goodreads.com/book/show/11358368-pop-star"
  constructor(private http: HttpClient) {}
  searchBy(targetSearch: string,targetType:string) {
    return this.http.get<IGenure[]>(this.baseSearchUrl+targetType+"/"+ targetSearch)
  }
}
