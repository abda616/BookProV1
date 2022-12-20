import { Component, OnInit } from '@angular/core';
import {SearchServiceService} from "../shared/search-service.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private search: SearchServiceService , private http:HttpClient) {
  }
  arr:Object=[]

  ngOnInit(): void {

    this.search.currentData.subscribe(data =>{
      this.searchValue=data;
    })
    this.onSearch()
  }
  searchOption=['all','title','author','genre','description']
  searchValue = '';

  onSearch() {
    this.search.updateData(this.searchValue);
    this.http.get(environment.apiUrl+`search/title/${this.searchValue}`).subscribe(data=>{
      this.arr=data;
    });
    console.log(this.arr)
  }
}
