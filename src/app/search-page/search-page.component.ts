import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchPageService } from '../services/search.service';
import { SharedServiceService } from '../services/shared-service.service';
import { searchDataTransferService } from '../services/Transfer/search-data-transfer.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})

export class SearchPageComponent implements OnInit {
  numOfColumns = [1, 2, 3, 4, 5];
  searchResult = [];
  filteredSearchResult=[]
  isFiltered=false;
  searchInput: string = '';

  filterationData={
   desiredGenres:[]
    ,
    didGenre:false
    ,
    genresFilter : ['Drama', 'Fiction', 'Nonfiction', 'Poetry', 'Psychology', 'Religion',
    'Fantasy', 'Self Help', 'Thrillers', 'Sci-fi', 'Romance']
    ,
    desiredRating:0
    ,
    stars :
     [1, 2, 3, 4, 5]
     ,
     isFiltersClicked: false
     ,
     didRate:false
     ,
    
   
    

  }
  searchOptions = ['All', 'Title', 'Author', 'Genre', 'Description'];
  
  
 
  
  @Output() changedSearchText: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(
    private searchService: SearchPageService,
    private search: searchDataTransferService,
    private sharedService: SharedServiceService
  ) {}

 

  ngOnInit(): void {
    this.search.searchData.subscribe((data) => {
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
  onGetData(){
if(this.isFiltered){
  if(this.filterationData.didRate){
    return this.filterRatings();
  }
  else if(this.filterationData.didGenre){
    return this.filterGenre(this.filterationData.desiredGenres);
  }
 
}   
else return this.searchResult
  }

  onSearchChange(val) {
    this.search.updateData(val);
    this.onSearchAll();
  }
  showFilters(element) {
    let maxHeight;
    if (this.filterationData.isFiltersClicked) {
      this.filterationData.isFiltersClicked = false;
      maxHeight = '0px';
      return maxHeight;
    } else {
      this.filterationData.isFiltersClicked = true;
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
    let starsElemnts = document.querySelectorAll('.fa-regular');
    starsElemnts.forEach((e) => {
  if(this.filterationData.didRate){
    e.classList.remove("fa-solid")
    console.log("clicked before")
  }
  if(e.id<=targetRating.id){
    e.classList.add("fa-solid")
    this.filterationData.didRate=true
    this.filterationData.desiredRating=targetRating.id
  }
    });
   
    this.isFiltered=true;
    

  }

  ////filter ratings
  filterRatings(){ 
   let temp=[]
   this.searchResult.map(e=>{
  if(Math.floor(e.book_average_rating)>=this.filterationData.desiredRating) {
    temp.push(e)
  }
 })
 return temp
  }
  filterGenre(targetGenres){
    this.filterationData.desiredGenres.push(targetGenres);
    this.filterationData.desiredGenres.forEach(e=>{
      
    })
    targetGenres.classList.toggle("active-genre")
  }
}
