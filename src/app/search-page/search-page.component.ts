import { Component, OnInit } from '@angular/core';
import { SearchPageService } from '../services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { Axios } from 'axios';
import { Cheerio } from 'cheerio';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
numOfColumns=[1,2,3,4,5]
searchResult=[]
targetBook="romance";
  constructor(private searchService:SearchPageService) { }

  ngOnInit(): void {
  // this.onClick()
  // this.searchService.findImg("https://www.goodreads.com/book/show/11358368-pop-star")
  }
// onClick(){
//   this.searchService.searchByAll(this.targetBook)
//  .subscribe(res=>{
//   this.searchResult=res;  
//   console.log(this.searchResult)

//  })
// }
}
