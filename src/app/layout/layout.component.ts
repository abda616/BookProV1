import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDrawer, MatDrawerMode} from "@angular/material/sidenav";
import {AuthService} from "../shared/Auth/auth.service";
import {Router, NavigationEnd} from '@angular/router';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import {filter, Observable} from "rxjs";
import {MessagesService} from "../services/message/messages.service";
import {BookDataService} from "../services/Transfer/book-data.service";
import {SharedServiceService} from "../services/shared-service.service";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  searchValue: string = '';
  positionInSearch = true;
  authorName: any | string = "book author name".toUpperCase();
  profilePic = "";
  conver;
  messegePic: any[];
  mode = "over"

  constructor(private auth: AuthService, private search: searchDataTransferService,
              private router: Router, private message: MessagesService,
              private dataService: BookDataService, private shared: SharedServiceService) {
  }


  ngOnInit(): void {
    this.auth.getUserProfile().subscribe(data => {
      if (!localStorage.getItem('userData') || !localStorage.getItem("interests")) {
        localStorage.setItem("userData", JSON.stringify(data));

        let myObj = JSON.parse(localStorage.getItem("userData"));
        myObj.profileImageUrl = myObj.profileImageUrl ? myObj.profileImageUrl : "assets/Avatars/men_av_2.png";
        myObj.interest = myObj.interest ? myObj.interest.toLowerCase() : "{'fiction','children','thriller'}";
        localStorage.setItem("userData", JSON.stringify(myObj));

        localStorage.setItem("interests", (myObj.interest));

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

  myDrawer: MatDrawer;

  toggleDrawer(ref: MatDrawer) {
    this.myDrawer = ref;
    ref.toggle().then();
    if (ref.opened)
      this.message.getAllConversation().subscribe(data => {
        this.conver = data;
        this.conver.forEach(x => {
            this.dataService.getBook(+x['his_book_id']).subscribe((book) => {
              book["coverPage"] = this.shared.getLargeImg(book["coverPage"], this.shared.getPosition(book["coverPage"], "m/", 2))
              x.imgUrl = book["coverPage"]
              console.log(x);
            });
          }
        )
      });
  }

  getBookImg(id: string): Observable<any> {
    let url: any;
    this.dataService.getBook(+id).subscribe((book) => {
      book["coverPage"] = this.shared.getLargeImg(book["coverPage"], this.shared.getPosition(book["coverPage"], "m/", 2))
      url = book['coverPage']
      console.log(url)
      return url;
    });
    return url;
  }

  LogOut() {
    this.auth.doLogout();
  }

  onEnter() {
    this.search.updateData(this.searchValue);
    this.searchValue = '';
    this.router.navigate(['app/search']).then();
  }

  goToC(exchange_id: any) {
    this.message.setMessageID(exchange_id);
    this.myDrawer.toggle().then();
    //this.mode = "side"
    this.router.navigate(['app/message']).then()
  }
}
