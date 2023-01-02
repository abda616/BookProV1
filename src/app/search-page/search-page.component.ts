import {Component, OnInit, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {SearchPageService} from '../services/search.service';
import {SharedServiceService} from '../services/shared-service.service';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  numOfColumns = [1, 2, 3, 4, 5];
  filteredSearchResult = [];
  images = "";
  targetBook = "romance";
  searchOption = ['all', 'title', 'author', 'genre', 'description']
  searchResult = [];
  isFiltered = false;
  isGenre: boolean = false;
  filterGenresArr = [];
  searchInput: string = '';
  didRate: boolean = false;
  searchOptions = ['All', 'Title', 'Author', 'Genre', 'Description'];
  genresFilter = [
    'Romance',
    'Religion',
    'Poetry',
    'Novel',
    'Drama',
    'Self-Help',
    'Sci-fi',
    'Fantasy',
  ];
  stars = [1, 2, 3, 4, 5];

  desiredRating: number = 0;
  isFiltersClicked: boolean = false;
  @Output() changedSearchText: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(private searchService: SearchPageService, private search: searchDataTransferService,
              private sharedService: SharedServiceService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {this.search.updatePosition(false);}, 0);
  }



  ngOnInit(): void {
    this.search.searchData.subscribe(data => {
      this.searchInput = data;
      this.onSearchAll();
    });
  }

  onSearchAll() {
    if (this.searchInput != '') {
      this.searchService.searchByAll(this.searchInput).subscribe((res) => {
        this.searchResult = res;
        this.searchResult = this.sharedService.removeNoImage(this.searchResult);
        //calling the shared service to change the url to get the large img
        this.searchResult.forEach((e) => {
          e.cover_page = this.sharedService.getLargeImg(
            e.cover_page,
            this.sharedService.getPosition(e.cover_page, 'm/', 2)
          );
        });
      });
    } else console.log('empty search');
    return this.searchResult
  }

  onGetData() {
    if (this.didRate) {
      return this.filterRatings();
    } else if (this.isGenre) {
      return this.filterGenre(this.filterGenresArr)
    } else return this.searchResult
  }

  onSearchChange(val) {
    this.search.updateData(val);
    this.onSearchAll();
  }

  showFilters(element) {
    let maxHeight;
    if (this.isFiltersClicked) {
      this.isFiltersClicked = false;
      maxHeight = '0px';
      return maxHeight;
    } else {
      this.isFiltersClicked = true;
      maxHeight = '280px';
      return maxHeight;
    }
  }

  getUrl(e) {
    console.log(e.cover_page);
    return e.cover_page;
  }


  ///fill the stars on click
  fillStars(targetRating) {
    let starsElements = document.querySelectorAll('.fa-regular');

    starsElements.forEach((e) => {
      if (this.didRate) {
        e.classList.remove("fa-solid")
        console.log("clicked before")
      }
      if (e.id <= targetRating.id) {
        e.classList.add("fa-solid")
        this.didRate = true
        this.desiredRating = targetRating.id
      }
    });
    this.isFiltered = true;
  }

  ////filter ratings
  filterRatings() {
    return this.searchResult.map(e => {
      return Math.floor(e.book_average_rating) >= this.desiredRating ? e : "";
    })
  }

  filterGenre(targetGenre) {
    this.filterGenresArr.push(targetGenre);
    console.log(targetGenre);
    this.isGenre = true;
    return this.searchResult.map(e => {
      return e.genres.forEach(e => {
        if (e == targetGenre) return e
      })
    })
  }
}
