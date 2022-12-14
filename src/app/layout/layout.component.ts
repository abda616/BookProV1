import {Component, OnInit} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  value = '';
  titleOfTheBook: any | string = "book name".toUpperCase();
  authorName: any | string = "book author name".toUpperCase();

  constructor(private authService:AuthService) {
  }

  ngOnInit(): void {
  }

  toggleDrawer(ref: MatDrawer) {
    ref.toggle();
  }

  // getWidth(ref: MatDrawer): number {
  //   let width = window.innerWidth;
  //   let isOpend= ref.opened;
  //
  //   isOpend ? console.log(isOpend+" width = "+(width-ref._getWidth())) :
  //                 console.log(isOpend+" width = "+width) ;
  //   return isOpend ? (width-ref._getWidth()) : window.innerWidth ;
  // }
  LogOut() {
    this.authService.doLogout()
  }
}
