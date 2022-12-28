import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { SearchPageService } from '../services/search.service';
import { SharedServiceService } from '../services/shared-service.service';
import {SearchServiceService} from "../shared/search-service.service";
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
numOfColumns=[1,2,3,4,5]
searchResult=[]
searchResultLen:number
images=""
targetBook="romance";
searchInput:string=""
@Output()
changedSearchText:EventEmitter<string> =new EventEmitter<string>();
  constructor(private searchService:SearchPageService, private search: SearchServiceService,
              private sharedService:SharedServiceService) { }
  searchOption=['all','title','author','genre','description']

  ngOnInit(): void {
    this.search.currentData.subscribe(data =>{
      this.searchInput=data;
    })
    this.onSearchAll()
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
  this.searchResultLen=this.searchResult.length;
 
  })
}
getLen(res){
  console.log(res.length)
  return res.length>0?true:false;
}
onSearchChange(val){
  this.search.updateData(this.searchInput);
  this.onSearchAll()
  this.changedSearchText.emit(val)
}
getUrl(e){
  console.log(e.cover_page)
  return e.cover_page;
}

}

