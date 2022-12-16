import {Component, OnInit,} from '@angular/core';
import {MainPageService} from "../services/main-page.service";
import {Book} from "../services/Book/Book";
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers:[MainPageService]
})
export class MainPageComponent implements OnInit {
  MostRated=[];
  constructor(
    private http:HttpClient,
    private mainPS:MainPageService
  ) {}
  ngOnInit(): void {
    this.http.get<Book[]>(`${environment.apiUrl}mostRated/10`).subscribe((x)=>{
       this.MostRated = x
      console.log(this.MostRated);
    });
    /*const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]


let animals5 = []
for (i =0;i<5; i++ ) {animals5[i]=animals.slice(i,i+2)}
console.log(animals5)
    */
  }

  imgPath= "https://books.google.com/books/publisher/content/images/frontcover/SSRGEAAAQBAJ?fife=w480-h690"
  headsInTop: string[] = [ "You May Like", "Favorite 7 Books", "Based On Similar User"];
  images = [1055, 194, 368, 36].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images2 = [123, 14, 38, 63].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images3 = [15, 134, 4, 434].map((n) => `https://picsum.photos/id/${n}/900/500`);
  allimg = [this.images, this.images2, this.images3];



}
