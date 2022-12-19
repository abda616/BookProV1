import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenure} from "./Book/IGenure";
import { Axios } from 'axios';
import { Cheerio } from 'cheerio';
@Injectable({
    providedIn: 'root'
  })
  export class SearchPageService {
baseSearchUrl=environment.apiUrl+"search/"
axios=require("axios")
cheerio=require("cheerio")
  targetedUrl="https://www.goodreads.com/book/show/11358368-pop-star"
    constructor(private http:HttpClient) { }


//     findImg(targetedUrl:string){
    
// this.http.get("https://www.goodreads.com/book/show/11358368-pop-star")
// .subscribe(res=>{
//   let html= res;
//   let $= this.cheerio.load(html)
//   $(".ResponsiveImage",html).each(function(){
//    console.log($(this))
//   })
// })

//     }
  // searchByAll(targetSearch:string){
  //   console.log(this.baseSearchUrl+targetSearch)
  // return  this.http.get<IGenure[]>(this.baseSearchUrl+"all"+"/"+targetSearch)
  // }
  }
  