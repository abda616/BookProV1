import {Component, OnInit, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef,} from '@angular/core';
import {SearchPageService} from '../services/search.service';
import {SharedServiceService} from '../services/shared-service.service';
import {searchDataTransferService} from '../services/Transfer/search-data-transfer.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  numOfColumns = [1, 2, 3, 4, 5];
  filteredSearchResult = [];
  searchOptions = ['All', 'Title', 'Author', 'Genre', 'Description'];
  searchResult = [];
  filterGenresArr = [];
  isFiltered = false;
  searchInput: string = '';
  didRate: boolean
  searchType: string = "all";
  @Output() changedSearchText: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchService: SearchPageService, private search: searchDataTransferService,
              private sharedService: SharedServiceService) {
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
      console.log(this.searchType)
    }
    if (this.searchInput != '') {
      this.searchService.searchBy(this.searchInput, this.searchType).subscribe(
        (res) => {
          this.searchResult = res;
          this.searchResult = this.sharedService.removeNoImage(this.searchResult);
          // calling the shared service to change the url to get the large img
          this.searchResult.forEach((e) => {
            e.cover_page = this.sharedService.getLargeImg(e.cover_page,
              this.sharedService.getPosition(e.cover_page, 'm/', 2));
          });
        });
    }
    return this.searchResult;
  }

  onGetData() {
    if (this.isFiltered) {
      return this.filteredSearchResult
    } else return this.searchResult;
  }

  onSearchChange(val) {
    this.search.updateData(val);
    this.onSearch(this.searchType);
  }

  getUrl(e) {
    console.log(e.cover_page);
    return e.cover_page;
  }

  onSearchBy(event) {
    console.log(this.searchResult)
    this.searchType = event.target.value.toLowerCase()
    this.onSearch(this.searchInput)
  }

}
