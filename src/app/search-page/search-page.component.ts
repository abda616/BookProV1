import {Component, OnInit, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {AuthService} from "../shared/Auth/auth.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  searchOptions = ['All', 'Title', 'Author', 'Description'];
  searchResult = [];
  searchInput: string = '';
  searchType: string = "title";
  @Output() changedSearchText: EventEmitter<string> = new EventEmitter<string>();

  constructor(private auth:AuthService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.auth.search.updatePosition(false);
    }, 0);
  }

  ngOnInit(): void {
    this.auth.search.searchData.subscribe((data) => {
      this.searchInput = data;
      this.onSearch(this.searchType);
    });
  }

  onSearch(event) {
    if (event.target !== undefined) {
      this.searchType = event.target.value
    }
    if (this.searchInput != '') {
      this.auth.main.searchBy(this.searchInput, this.searchType).subscribe(
        (res) => {
          this.searchResult = res;
          this.searchResult = this.auth.shared.removeNoImage(this.searchResult);
          // calling the shared service to change the url to get the large img
        });
    }
    return this.searchResult;
  }

  onGetData() {
     return this.searchResult;
  }

  onSearchChange(val) {
    this.auth.search.updateData(val);
    this.onSearch(this.searchType);
  }

  goToBookPage(book: any) {
    this.auth.bookService.transBook(book);
    this.auth.router.navigate(['app/book']).then();
  }

  onSearchBy(event) {
    this.searchType = event.target.value.toLowerCase()
    this.onSearch(this.searchInput)
  }

}
