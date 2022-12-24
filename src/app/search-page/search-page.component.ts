import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { SearchPageService } from '../services/search.service';
import { SharedServiceService } from '../services/shared-service.service';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
numOfColumns=[1,2,3,4,5]
searchResult=[]
images=""
targetBook="romance";
searchInput:string=""
@Output()
changedSearchText:EventEmitter<string> =new EventEmitter<string>();
  constructor(
    private searchService:SearchPageService
    ,
    private sharedService:SharedServiceService
    ,

    ) { }

  ngOnInit(): void {
 this.onSearchAll()

}

onSearchAll(){
  this.searchService.searchByAll(this.targetBook)
  .subscribe(res=>{
  this.searchResult=res;
  //calling the shared service to change the url to get the large img 
  this.searchResult.forEach(e=>{
    e.cover_page=this.sharedService.getLargeImg(e.cover_page,this.sharedService.getPosition(e.cover_page,"m/",2))
  })
  })
}
onSearchChange(){
  this.changedSearchText.emit(this.searchInput)
}

}

