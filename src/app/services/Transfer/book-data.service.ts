import {Injectable} from '@angular/core';
import {BehaviorSubject, share, shareReplay} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class BookDataService {
  private myData$ = null;

  constructor(private http: HttpClient) {
  }

  private book = new BehaviorSubject<number>(null);
  bookData = this.book.asObservable();

  transBook(data: number) {
    this.book.next(data);
    if (data !== null) {
      localStorage.setItem('Book', String(data));
    }
  }

  getBook(id: number) {
    return this.http.get(`${environment.apiUrl}book/getBook?book_id=${id}`)
  }

  getRate(id: number) {
    return this.http.get(`${environment.apiUrl}book/getMyRating?book_id=${id}`)
  }

  setRate(rate: number, id: number) {
    return this.http.post(`${environment.apiUrl}profile/rateBook?rating=${rate}&book_id=${id}`, null)
  }

  addBookToOwn(id: number) {
    return this.http.post(`${environment.apiUrl}profile/addBookToOwned?book_id=${id}`, null)
  }

  removeBookFromOwn(id: number) {
    return this.http.post(`${environment.apiUrl}profile/removeBookFromOwned?book_id=${id}`, null)
  }

  tradeThisBook(id: number, isAvalable) {
    return this.http.post(`${environment.apiUrl}profile/makeBookAvailable?book_id=${id}&available=${!isAvalable}`, null)
  }

  isOwenedBook(id: number) {
    return this.http.get(`${environment.apiUrl}profile/owned`)
  }
}

