import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {avatarPicture, City} from "./Interfaces/userSignup";

@Injectable({
  providedIn: 'root'
})
@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class SharedDataModule {
  constructor() {}

  private patternValidator = new BehaviorSubject<string>("(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}");
  Pattern = this.patternValidator.asObservable();
  private cityArray = new BehaviorSubject<City[]>([
    {value: 'amman', viewValue: 'Amman'},
    {value: 'zarqa', viewValue: 'Zarqa'},
    {value: 'Salt', viewValue: 'As-Salt'},
    {value: 'irbid', viewValue: 'Irbid'},
    {value: 'jerash', viewValue: 'Jerash'},
    {value: 'ajloun', viewValue: 'Ajloun'},
    {value: 'madaba', viewValue: 'Madaba'},
    {value: 'mafraq', viewValue: 'Al-Mafraq'},
    {value: 'maan', viewValue: 'Maan'},
    {value: 'tafilah', viewValue: 'At-Tafilah'},
    {value: 'madaba', viewValue: 'Madaba'},
    {value: 'aqaba', viewValue: 'Aqaba'},
  ]);
  Citys = this.cityArray.asObservable();

  private InterestArray = new BehaviorSubject<string[]>(
    ['fiction', 'non-fiction', 'poetry', 'romance', 'fantasy','paranormal',
      'history','comics','historical-fiction','children', 'mystery', 'thriller', 'crime','graphic', 'biography']);

  Interests = this.InterestArray.asObservable();


  private avatars = new BehaviorSubject<avatarPicture[]>(
    [
      {picValue:"assets/Avatars/men_av_1.png",viewValue:'men 1'},
      {picValue:"assets/Avatars/men_av_2.png",viewValue:'men 2'},
      {picValue:"assets/Avatars/men_av_3.png",viewValue:'men 3'},
      {picValue:"assets/Avatars/women_av_1.png",viewValue:'women 1'},
      {picValue:"assets/Avatars/women_av_2.png",viewValue:'women 2'},
      {picValue:"assets/Avatars/women_av_3.png",viewValue:'women 3'},
    ]);
  Avatars = this.avatars.asObservable();

}
