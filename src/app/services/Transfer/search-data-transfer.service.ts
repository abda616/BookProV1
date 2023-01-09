import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class searchDataTransferService {

  private searchVal = new BehaviorSubject<string>('');
  private position = new BehaviorSubject<boolean>(true);

  searchData = this.searchVal.asObservable();
  currentPosition = this.position.asObservable();

  updatePosition(data: boolean) {
    this.position.next(data);
  }

  updateData(data: string) {
    this.searchVal.next(data);
  }

  constructor() {}
}
