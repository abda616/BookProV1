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
  imports: [CommonModule]
})
export class SharedDataModule {
  constructor() {
  }

  private patternValidator = new BehaviorSubject<string>("(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}");
  private cityArray = new BehaviorSubject<City[]>([
    {value: 'amman', viewValue: 'Amman'},
    {value: 'zarqa', viewValue: 'Zarqa'},
    {value: 'balqaa', viewValue: 'Balqa\'a'},
  ]);
  private InterestArray = new BehaviorSubject<string[]>(
    ['Drama', 'Fiction', 'Nonfiction', 'Poetry', 'Psychology', 'Religion',
      'Fantasy', 'Self Help', 'Thrillers', 'Sci-fi', 'Romance']);
  Citys = this.cityArray.asObservable();
  Interests = this.InterestArray.asObservable();
  Pattern = this.patternValidator.asObservable();
}
