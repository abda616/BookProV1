import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {SearchPageService} from '../services/search.service';
import {SharedServiceService} from '../services/shared-service.service';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  numOfColumns = [1, 2, 3, 4, 5];
  searchResult = [];
  images = ""
  targetBook = "romance";
  searchInput: string = ""
  @Output() changedSearchText: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchService: SearchPageService, private search: searchDataTransferService,
              private sharedService: SharedServiceService) {
  }

  searchOption = ['all', 'title', 'author', 'genre', 'description']

  ngOnInit(): void {
    this.search.searchData.subscribe(data => {
      this.searchInput = data;
      this.onSearchAll()
    });

  }

  onSearchAll() {
    if (this.searchInput != '') {
      this.searchService.searchByAll(this.searchInput).subscribe(res => {

        this.searchResult = res;
        this.searchResult = this.sharedService.removeNoImage(this.searchResult)
        //calling the shared service to change the url to get the large img
        this.searchResult.forEach(e => {
          e.cover_page = this.sharedService.getLargeImg(e.cover_page, this.sharedService.getPosition(e.cover_page, "m/", 2))
        })

      })
    } else console.log("empty search")

  }

  onSearchChange(val) {
    this.search.updateData(val);
    this.onSearchAll()
  }

  getUrl(e) {
    console.log(e.cover_page)
    return e.cover_page;
  }
}

