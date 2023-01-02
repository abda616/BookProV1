import {AfterViewInit, Component, OnInit,} from '@angular/core';
import {MainPageService} from "../services/main-page.service";
import {Book} from "../shared/Interfaces/Book";
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {SharedServiceService} from '../services/shared-service.service';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [MainPageService]
})
export class MainPageComponent implements OnInit, AfterViewInit {
  constructor(private http: HttpClient, private mainPS: MainPageService,
              private sharedService: SharedServiceService, private search: searchDataTransferService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search.updatePosition(true);
    }, 0)
  }
  headsInTop: string[] = ["Recommended For you","Top 10 Books", "Based On Similar Users"];
  topNArr = [];
  MostRated = [];
  BoSU = [];
  ngOnInit(): void {
    this.getMostRated();
    this.getTopN();
    this.getBoSU();
  }

  getMostRated() {
    this.http.get<Book[]>(`${environment.apiUrl}topn`).subscribe((res) => {
      this.MostRated = res;
      this.MostRated = this.sharedService.removeNoImage(this.MostRated);
      this.MostRated.forEach(e => {
        e.cover_page = this.sharedService.getLargeImg(e.cover_page, this.sharedService.getPosition(e.cover_page, "m/", 2))
      });

      let MostRatedC = [];
      for (let i = 0; i < 10; i++) {
        MostRatedC[i] = this.MostRated.slice(i*2, i*2+2)
      }
      this.MostRated = MostRatedC;
    });
  }

  getTopN() {
    this.http.get<Book[]>(`${environment.apiUrl}topn`).subscribe(res => {
      this.topNArr = res;
      this.topNArr = this.sharedService.removeNoImage(this.topNArr);
      this.topNArr.forEach(e => {
        e.cover_page = this.sharedService.getLargeImg(e.cover_page, this.sharedService.getPosition(e.cover_page, "m/", 2))
      });

      let topNArrC = [];
      for (let i = 0; i < 7; i++) {
        topNArrC[i] = this.topNArr.slice(i*3, i*3+3)
      }
      this.topNArr = topNArrC;
    })
  }
  getBoSU() {
    this.http.get<Book[]>(`${environment.apiUrl}topn`).subscribe(res => {
      this.BoSU = res;
      this.BoSU = this.sharedService.removeNoImage(this.BoSU);
      this.BoSU.forEach(e => {
        e.cover_page = this.sharedService.getLargeImg(e.cover_page, this.sharedService.getPosition(e.cover_page, "m/", 2))
      });

      let BoSUC = [];
      for (let i = 0; i < 7; i++) {
        BoSUC[i] = this.BoSU.slice(i*3, i*3+3)
      }
      this.BoSU = BoSUC;
    })
  }

  imgPath = "https://books.google.com/books/publisher/content/images/frontcover/SSRGEAAAQBAJ?fife=w480-h690"
  images = [1055, 194].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images2 = [123, 14, 38, 63].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images3 = [15, 134, 4, 434].map((n) => `https://picsum.photos/id/${n}/900/500`);
  allimg = [this.images, this.images2, this.images3];



}
