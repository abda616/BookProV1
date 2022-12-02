import {Component, OnInit,} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  headsInTop :string[] = ["Top 10 Books","You May Like","Favorite 7 Books","Based On Similar User"];
  imgPath = "https://books.google.com/books/publisher/content/images/frontcover/zlNdEAAAQBAJ?fife=w480-h690";
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  constructor() { }
  ngOnInit(): void {}

}
