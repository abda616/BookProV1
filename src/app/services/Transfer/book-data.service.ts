import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BookDemo} from "../../shared/Interfaces/BookDemo";

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  private book = new BehaviorSubject<BookDemo>( new BookDemo(0, "", "", "", 0, "", 0, 0, "", "", "", "", "", "", "", "", ""));
  bookData = this.book.asObservable();

  transBook(data: any) {
    this.book.next(data);
  }

  private position = new BehaviorSubject<boolean>(true);
  slidePosition = this.position.asObservable();

  updatePosition(data: boolean) {
    this.position.next(data);
  }

  constructor() {
  }
}

