import {Component, OnInit} from '@angular/core';
import {SharedDataModule} from "../shared/shared-data.module";
import {City} from "../shared/Interfaces/userSignup";
import {FormControl} from "@angular/forms";
import {AuthService} from "../shared/Auth/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private patternValidator: string = '';
  citys: City[] = [];
  Interests: string[] = [];
  userInterests= localStorage.getItem('interests').toString().replace(/[{}']/gi, "").split(/,/gi);
  UInterests = new FormControl(localStorage.getItem('interests').toString().replace(/[{}]/gi, "").toString());

  userName: string = "Name";
  userCity: string = "Amman";
  userEmail: string="example@example.com";
  profilePic="assets/Avatars/men_av_2.png";

  constructor(private sharedData: SharedDataModule, private auth:AuthService) {
  }

  ngOnInit(): void {
    this.sharedData.Pattern.subscribe(data=>{this.patternValidator=data});

    this.auth.getUserProfile().subscribe(data=>{
      this.userName=data['firstName']+" "+data["lastName"];
      this.profilePic = data['profileImageUrl']?data['profileImageUrl']:"assets/Avatars/men_av_2.png";
      this.userCity=data['city'];
      this.userEmail=data['email'];
      localStorage.setItem("interests",data['interest']?data['interest']:JSON.stringify(`{'Fiction', 'Non-fiction', 'Poetry','Children', 'Mystery', 'Thriller'}`));
    })

    this.sharedData.Citys.subscribe(data =>
      this.citys = data);
    this.sharedData.Interests.subscribe(data =>
      this.Interests = data);

    this.sharedData.Pattern.subscribe(data => this.patternValidator = data);
  }

}
