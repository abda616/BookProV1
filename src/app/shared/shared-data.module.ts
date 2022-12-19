import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {City} from "./Interfaces/userSignup";

@Injectable({
  providedIn: 'root'
})
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedDataModule {
  constructor() {
  }

  private cityArray = new BehaviorSubject<City[]>([
    {value: 'amman', viewValue: 'Amman'},
    {value: 'zarqa', viewValue: 'Zarqa'},
    {value: 'balqaa', viewValue: 'Balqa\'a'},
  ]);
  Citys = this.cityArray.asObservable();
  private InterestArray = new BehaviorSubject<string[]>(['Drama', 'Fiction', 'Nonfiction', 'Poetry', 'Psychology', 'Religion', 'Fantasy', 'Self Help', 'Thrillers', 'Sci-fi', 'Romance']);
  Interests = this.InterestArray.asObservable();
}
