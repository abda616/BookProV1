import {Component, OnInit, EventEmitter, Output, AfterViewInit, ViewChild, ViewChildren, ElementRef,} from '@angular/core';
import { last } from 'cheerio/lib/api/traversing';
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
 isLoaded:boolean=false;
 observer:any;
 loadCount:number=0;
 dataNum:number=0;
  @ViewChild('searchBar') inputElementRef: ElementRef;


  @Output() changedSearchText: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(
    private searchService: SearchPageService,
    private search: searchDataTransferService,
    private sharedService: SharedServiceService
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search.updatePosition(false);
    }, 0);
    this.inputElementRef.nativeElement.focus();
  

  }

  ngOnInit(): void {
    this.search.searchData.subscribe((data) => {
      this.searchInput = data;
      this.onSearch(this.searchType);
      this.IntersectionObserver()
    });

  }

  onSearch(event) {

if(event.target!==undefined){
  this.searchType=event.target.value
  console.log(this.searchType)
}
    if (this.searchInput != '') {

      this.searchService.searchBy(this.searchInput,this.searchType).subscribe((res) => {
        this.searchResult = res;
        this.searchResult = this.sharedService.removeNoImage(this.searchResult);
        // calling the shared service to change the url to get the large img
        this.searchResult.forEach((e) => {
          e.cover_page = this.sharedService.getLargeImg(
            e.cover_page,
            this.sharedService.getPosition(e.cover_page, 'm/', 2)
          );
        });
        this.loadCount=0;
        this.dataNum=this.searchResult.length/5;
      });
    } else console.log('empty search');
    return this.searchResult;
  }

  onGetData() {
    if(this.searchResult.length>0){
      let lastRow=document.querySelector(".card:last-child")
     console.log(lastRow)
      this.observer.observe(lastRow)
      console.log(this.searchResult.length)
    }
  
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
    this.searchType=event.target.value.toLowerCase()
  this.onSearch(this.searchInput)
  }
  IntersectionObserver(){
    let options = {
      root: document.querySelector('#scrollArea'),
      rootMargin: '200px',
      threshold: .1,
    }
     this.observer=new IntersectionObserver((entries)=>{
if(entries[0].isIntersecting){
 
  console.log(this.loadCount)
  this.loadCount++;
}
    },options)
  }

  ///fill the stars on click
  // fillStars(targetRating) {
  //   let starsElemnts = document.querySelectorAll('.fa-regular');
  //   starsElemnts.forEach((e) => {
  //     if (this.filterationData.didRate) {
  //       e.classList.remove('fa-solid');
  //       console.log('clicked before');
  //     }
  //     if (e.id <= targetRating.id) {
  //       e.classList.add('fa-solid');
  //       this.filterationData.didRate = true;
  //       this.filterationData.desiredRating = targetRating.id;
  //     }
  //   });
  //   this.isFiltered = true;
  // }

  ////filter ratings

  // filterRatings() {
  //   let temp = [];
  //   this.searchResult.map((e) => {
  //     if (
  //       Math.floor(e.book_average_rating) >= this.filterationData.desiredRating
  //     ) {
  //       temp.push(e);
  //     }
  //   });
  //   return temp;
  // }


}
