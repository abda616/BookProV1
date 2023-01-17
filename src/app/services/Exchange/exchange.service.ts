import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient) {
  }

  initializeExchange(MyBook: number, HisBook: boolean) {
    return this.http.post<any>(`${environment.apiUrl}exchange/initExchange?his_book_id=${HisBook}&my_book_id=${MyBook}`, null)
  }

  booksForExchange() {
    return this.http.get(`${environment.apiUrl}exchange/booksForExchange`)
  }

  exchangesFromMe() {
    return this.http.get(`${environment.apiUrl}exchange/exchangesFromMe`)
  }

  exchangesFromPeople() {
    return this.http.get(`${environment.apiUrl}exchange/exchangesFromPeople`)
  }
  acceptExchange(id: number, is: boolean) {
    return this.http.post<any>(`${environment.apiUrl}exchange/acceptExchange?exchange_id=${id}&accept=${is}`, null)
  }
}
