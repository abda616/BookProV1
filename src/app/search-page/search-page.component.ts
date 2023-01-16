import {Component, OnInit, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {SharedServiceService} from '../services/shared-service.service';
import {searchDataTransferService} from '../services/Transfer/search-data-transfer.service';
import {BookDataService} from "../services/Transfer/book-data.service";
import {Router} from "@angular/router";
import {MainService} from "../services/Main/main.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  searchOptions = ['All', 'Title', 'Author', 'Description'];
  searchResult = [];
  searchInput: string = '';
  searchType: string = "all";
  @Output() changedSearchText: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchService: MainService, private search: searchDataTransferService,
              private sharedService: SharedServiceService,
              private moveBook: BookDataService, private router: Router) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search.updatePosition(false);
    }, 0);
  }

  ngOnInit(): void {
    this.search.searchData.subscribe((data) => {
      this.searchInput = data;
      this.onSearch(this.searchType);
    });
  }

  onSearch(event) {
    if (event.target !== undefined) {
      this.searchType = event.target.value
    }
    if (this.searchInput != '') {
      this.searchService.searchBy(this.searchInput, this.searchType).subscribe(
        (res) => {
          this.searchResult = res;
          this.searchResult = this.sharedService.removeNoImage(this.searchResult);
          // calling the shared service to change the url to get the large img
        });
    }
    return this.searchResult;
  }

  onGetData() {
     return this.searchResult;
  }

  onSearchChange(val) {
    this.search.updateData(val);
    this.onSearch(this.searchType);
  }

  goToBookPage(book: any) {
    this.moveBook.transBook(book);
    this.router.navigate(['app/book']).then();
  }

  onSearchBy(event) {
    this.searchType = event.target.value.toLowerCase()
    this.onSearch(this.searchInput)
  }

}
