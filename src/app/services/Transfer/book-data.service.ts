import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  private book = new BehaviorSubject<number>(0);
  bookData = this.book.asObservable();

  transBook(data: number) {
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

