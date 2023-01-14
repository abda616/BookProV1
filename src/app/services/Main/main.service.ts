import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../shared/Interfaces/Book";
import {environment} from "../../../environments/environment.prod";
import {IGenure} from "../../shared/Interfaces/IGenure";
import {asyncScheduler, share, shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
  }

  private myData1 = null;
  private myData2 = null;

  topBook() {
    if (!this.myData1)
      return this.myData1 = this.http.get<Book[]>(`${environment.apiUrl}home/top10`)
        .pipe(shareReplay(1))
    return this.myData1;
  }

  basedInYourInterst() {
    if (!this.myData2)
      return this.myData2 = this.http.get<Book[]>(`${environment.apiUrl}home/basedOnYourInterests`)
        .pipe(shareReplay(1));
    return this.myData2;
  }


  basedOnSimUser() {
    return this.http.get<Book[]>(`${environment.apiUrl}home/recommendBySimilarUsers`)
      .pipe(shareReplay(1, 0, asyncScheduler))
  }

  searchBy(targetSearch: string, targetType: string) {
    let baseSearchUrl = environment.apiUrl + "search"
    return this.http.get<IGenure[]>(`${baseSearchUrl}` + `?domain=${targetType}&query=${targetSearch}`)
  }
}
