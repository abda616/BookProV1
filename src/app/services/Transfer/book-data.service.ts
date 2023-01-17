import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {ownedBooks} from 'src/app/shared/Interfaces/Book';


@Injectable({
  providedIn: 'root'
})
export class BookDataService {
  constructor(private http: HttpClient  ) {}

  private book = new BehaviorSubject<number>(null);
  bookData = this.book.asObservable();
  transBook(data: number) {
    if (data !== null) {
      this.book.next(data);
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

  tradeThisBook(id: number, isAvailable) {
    return this.http.post(`${environment.apiUrl}profile/makeBookAvailable?book_id=${id}&available=${!isAvailable}`, null)
  }

  isOwnedBook(id: number) {
    return this.http.get(`${environment.apiUrl}profile/owned`)
  }

  allOwnedBook() {
    return this.http.get<ownedBooks[]>(`${environment.apiUrl}profile/owned`)
  }

  favorites() {
    return this.http.get<ownedBooks[]>(`${environment.apiUrl}profile/favorites`)
  }
  recommendBySimilarBook(id:number){
    return this.http.get<ownedBooks[]>(`${environment.apiUrl}home/recommendBySimilarBook?book_id=${id}`)
  }
}

