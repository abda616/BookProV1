import {Component, OnInit} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {AuthService} from "../shared/Auth/auth.service";
import {Router} from "@angular/router";
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  searchValue: string = '';
  position = true;
  titleOfTheBook: any | string = "book name".toUpperCase();
  authorName: any | string = "book author name".toUpperCase();

  constructor(private authService: AuthService, private search: searchDataTransferService, private router: Router) {
  }

  ngOnInit(): void {
    this.search.updatePosition(true);
    this.search.currentPosition.subscribe(x => this.position = x);
  }

  toggleDrawer(ref: MatDrawer) {
    ref.toggle();
  }

  LogOut() {
    this.authService.doLogout()
  }

  onEnter() {
    this.search.updateData(this.searchValue);
    this.searchValue = '';
    this.router.navigate(['app/search']);
  }
}
