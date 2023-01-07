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
  Interests: string[] = JSON.parse(localStorage.getItem('interests'));
  UInterests = new FormControl(this.Interests);
  userName: string = "Name";
  userCity: string = "Amman";
  userEmail: string="example@example.com";
  userInterests= this.Interests;
  profilePic="";

  constructor(private sharedData: SharedDataModule, private auth:AuthService) {
  }

  ngOnInit(): void {
    this.sharedData.Pattern.subscribe(data=>{this.patternValidator=data});
    this.auth.getUserProfile().subscribe(data=>{
      this.userName=data['firstName']+" "+data["lastName"]
      this.profilePic = data['profileImageUrl']?data['profileImageUrl']:"assets/Avatars/men_av_2.png"
      this.userCity=data['city']
      this.userInterests=data['interest']
      this.userEmail=data['email']
    })

    const myBlogs = ['Drama', 'Fiction', 'Nonfiction'];
    localStorage.setItem('interests', JSON.stringify(myBlogs));

    this.sharedData.Citys.subscribe(data =>
      this.citys = data);
    this.sharedData.Interests.subscribe(data =>
      this.Interests = data);

    this.sharedData.Pattern.subscribe(data => this.patternValidator = data);
  }

}
