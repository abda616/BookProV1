import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BookDemo} from "../../shared/Interfaces/BookDemo";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  private book = new BehaviorSubject<number>(null);
  bookData = this.book.asObservable();
  transBook(data: number) {
    this.book.next(data);
    if (data !== null) {
      localStorage.setItem('Book',String(data));
    }
  }
  private position = new BehaviorSubject<boolean>(true);
  slidePosition = this.position.asObservable();
  updatePosition(data: boolean) {
    this.position.next(data);
  }
  getBook(id:number){
    return this.http.get(`${environment.apiUrl}book/getBook?book_id=${id}`)
  }
  constructor(private http:HttpClient) {
  }

  getRate(id: number) {
    return this.http.get(`${environment.apiUrl}book/getMyRating?book_id=${id}`)
  }

  setRate(rate: number, id: number) {
    this.http.post(`${environment.apiUrl}profile/rateBook?rating=${rate}&book_id=${id}`,null)
  }
  addBookToOwn(id: number) {
    this.http.post(`${environment.apiUrl}profile/addBookToOwned?book_id=${id}`,null)
  }
  tradeThisBook(id: number){
    this.http.post(`${environment.apiUrl}profile/addBookToOwned?book_id=${id}`,null)
  }
}

