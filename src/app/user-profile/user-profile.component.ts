import {Component, OnInit} from '@angular/core';
import {SharedDataModule} from "../shared/shared-data.module";
import {City} from "../shared/Interfaces/userSignup";
import {FormControl} from "@angular/forms";
import {environment} from "../../environments/environment.prod";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private patternValidator: string = '';
  citys: City[] = [];
  Interests: string[] = JSON.parse(localStorage.getItem('interests'));

  UInterests = new FormControl(this.Interests);
  userName: string = "Johnatan Smith";
  userCity: string = "Amman";
  userEmail: string="example@example.com";
  userInterests= this.Interests;

  constructor(private sharedData: SharedDataModule) {
  }

  ngOnInit(): void {
    const myBlogs = ['Drama', 'Fiction', 'Nonfiction'];
    localStorage.setItem('interests', JSON.stringify(myBlogs));

    this.sharedData.Citys.subscribe(data =>
      this.citys = data);
    this.sharedData.Interests.subscribe(data =>
      this.Interests = data);

    this.sharedData.Pattern.subscribe(data => this.patternValidator = data);
  }

}
