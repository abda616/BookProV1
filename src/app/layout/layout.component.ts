import {Component, OnInit} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {AuthService} from "../shared/Auth/auth.service";
import {NavigationEnd} from '@angular/router';
import {filter} from "rxjs";
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  searchValue: string = '';
  positionInSearch = true;
  profilePic = "";
  conver = [];
  matBadge= this.conver.length;
  hidden = false;


  constructor(private auth: AuthService) {
  }


  ngOnInit(): void {
    this.auth.getUserProfile().subscribe(data => {
      if (!localStorage.getItem('userData') || !localStorage.getItem("interests")) {
        localStorage.setItem("userData", JSON.stringify(data));
        let myObj = JSON.parse(localStorage.getItem("userData"));

        if (!myObj.interest) {
          let into=[];
          this.auth.main.basedInYourInterest().subscribe(data => {
            data.forEach(e => {
              let x = e['genres'].toString().replace(/[{}']/gi, "").split(',')
              x.forEach(ele => {
                into.push(ele)
              })
              into = [...new Set(into)];
            })
            myObj.interest = myObj.interest ? myObj.interest.toLowerCase() : into.slice(0,3);
            localStorage.setItem("interests", (myObj.interest));
          })
        }else localStorage.setItem("interests", (myObj.interest));

        localStorage.setItem("userData", JSON.stringify(myObj));
        this.profilePic = JSON.parse(localStorage.getItem("userData")).profileImageUrl;
      }
      this.profilePic = JSON.parse(localStorage.getItem("userData")).profileImageUrl
    });

    this.auth.search.updatePosition(true);
    this.auth.search.currentPosition.subscribe(x => this.positionInSearch = x);
    this.getMessage()
    this.auth.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      (event: NavigationEnd) => {
        document.querySelector("#mat-drawer-content").scroll({top: 0, left: 0})
      });
  }

  private getMessage() {
    this.auth.message.getAllConversation().subscribe(data => {
      this.matBadge= data.length;
      data.forEach(x => {
          /*get img for the book*/
          this.auth.bookService.getBook(+x['his_book_id']).subscribe((book) => {
            book["coverPage"] = this.auth.shared.getLargeImg(book["coverPage"], this.auth.shared.getPosition(book["coverPage"], "m/", 2))
            x.imgUrl = book["coverPage"]
          });
        }
      );
      if (data != []) {
        this.conver = data;
      }
    });
  }

  myDrawer: MatDrawer;

  toggleDrawer(ref: MatDrawer) {
    this.myDrawer = ref;
    ref.toggle().then();
    this.hidden =!this.hidden
    if (ref.opened) this.getMessage();

  }

  LogOut() {
    this.auth.doLogout();
  }

  onEnter() {
    this.auth.search.updateData(this.searchValue);
    this.searchValue = '';
    this.auth.router.navigate(['app/search']).then();
  }
  goToC(x,y) {
    this.auth.message.setMessageID(x,y);
    this.myDrawer.toggle().then();
    this.auth.router.navigate(['app/message']).then( ()=>
      window.location.reload()
    )
  }
}
