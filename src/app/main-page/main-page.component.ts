import {Component, OnInit,} from '@angular/core';
import {MainPageService} from "../services/main-page.service";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers:[MainPageService]
})
export class MainPageComponent implements OnInit {
  test=""
  constructor(
  //  private mainPS:MainPageService
  ) {}
  ngOnInit(): void {
    //console.log(this.mainPS.getMostRated())
  }

  imgPath= "https://books.google.com/books/publisher/content/images/frontcover/SSRGEAAAQBAJ?fife=w480-h690"
  headsInTop: string[] = [ "You May Like", "Favorite 7 Books", "Based On Similar User"];
  images = [1055, 194, 368, 36].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images2 = [123, 14, 38, 63].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images3 = [15, 134, 4, 434].map((n) => `https://picsum.photos/id/${n}/900/500`);
  allimg = [this.images, this.images2, this.images3];



}
