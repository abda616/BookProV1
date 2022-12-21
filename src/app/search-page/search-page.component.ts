import { Component, OnInit } from '@angular/core';
import { SearchPageService } from '../services/search.service';

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
  constructor(private searchService:SearchPageService) { }

  ngOnInit(): void {
  this.onClick()

}
 getPosition(string, target, index) {
  return string.split(target, index).join(target).length;
}
onClick(){
  this.searchService.searchByAll(this.targetBook)
 .subscribe(res=>{
  this.searchResult=res;  
  this.searchResult.forEach(e=>{
  let index=  this.getPosition(e.cover_page,"m/",2) 
e.cover_page=e.cover_page.slice(0,index-1)+e.cover_page.slice(index-1,index+1).replace("m",'l')+e.cover_page.slice(index+1,59);
console.log(e.cover_page  )
  })

 })
}
}
