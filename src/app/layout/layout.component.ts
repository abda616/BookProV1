import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {AuthService} from "../shared/Auth/auth.service";
import {Router, NavigationEnd} from '@angular/router';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import {filter} from "rxjs";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  searchValue: string = '';
  positionInSearch = true;
  authorName: any | string = "book author name".toUpperCase();
  profilePic = ""

  constructor(private auth: AuthService, private search: searchDataTransferService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.auth.getUserProfile().subscribe(data => {
      if (!localStorage.getItem('userData') || !localStorage.getItem("interests")) {
        localStorage.setItem("userData", JSON.stringify(data));

        let myObj = JSON.parse(localStorage.getItem("userData"));
        myObj.profileImageUrl = myObj.profileImageUrl ? myObj.profileImageUrl : "assets/Avatars/men_av_2.png";
        myObj.interest = myObj.interest ? myObj.interest.toLowerCase() : "{'fiction','children','thriller'}";
        localStorage.setItem("userData", JSON.stringify(myObj));

        localStorage.setItem("interests", (myObj.interest) );

        this.profilePic = JSON.parse(localStorage.getItem("userData")).profileImageUrl;
      }
      this.profilePic = JSON.parse(localStorage.getItem("userData")).profileImageUrl
    });

    this.search.updatePosition(true);
    this.search.currentPosition.subscribe(x => this.positionInSearch = x);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      (event: NavigationEnd) => {
        document.querySelector("#mat-drawer-content").scroll({top: 0, left: 0})
      });
  }

  toggleDrawer(ref: MatDrawer) {
    ref.toggle().then();
  }

  LogOut() {
    this.auth.doLogout();
  }

  onEnter() {
    this.search.updateData(this.searchValue);
    this.searchValue = '';
    this.router.navigate(['app/search']).then();
  }
}
