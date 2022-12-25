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
 

}

onSearchAll(){
  this.searchService.searchByAll(this.searchInput)
  .subscribe(res=>{
  this.searchResult=res;
  this.searchResult=this.sharedService.removeNoImage(this.searchResult)
  //calling the shared service to change the url to get the large img 
  this.searchResult.forEach(e=>{
  
    e.cover_page=this.sharedService.getLargeImg(e.cover_page,this.sharedService.getPosition(e.cover_page,"m/",2))
  })
  })
}
onSearchChange(val){
  this.onSearchAll()
  this.changedSearchText.emit(val)
}
getUrl(e){
  console.log(e.cover_page)
  return e.cover_page;
}

}

