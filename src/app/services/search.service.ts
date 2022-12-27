import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenure} from '../shared/Interfaces/IGenure';
import {SharedServiceService} from './shared-service.service';

@Injectable({providedIn: 'root'})
export class SearchPageService {
  baseSearchUrl = environment.apiUrl + "search/all"
  html = ""
  targetedUrl = "https://www.goodreads.com/book/show/11358368-pop-star"
  constructor(private http: HttpClient, private sharedService: SharedServiceService) {}
  searchByAll(targetSearch: string) {
    return this.http.get<IGenure[]>(this.baseSearchUrl + "/" + targetSearch)
  }
}
