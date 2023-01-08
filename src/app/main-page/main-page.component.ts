import {AfterViewInit, Component, OnInit,} from '@angular/core';
import {Book} from "../shared/Interfaces/Book";
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {SharedServiceService} from '../services/shared-service.service';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import {BookDataService} from "../services/Transfer/book-data.service";
import {BookDemo} from "../shared/Interfaces/BookDemo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],

})
export class MainPageComponent implements OnInit, AfterViewInit {
  constructor(private http: HttpClient, private router: Router,
              private sharedService: SharedServiceService, private search: searchDataTransferService,
              private moveBook: BookDataService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search.updatePosition(true);
    }, 0)
  }

  headsInTop: string[] = ["Top Rated Book", "Based On Your Interests", "Based On Similar Users"];
  topArr = [];
  YInterests = [];
  BoSU = [];
  allGenreName=[];
  allGenreArr=[]
  ngOnInit(): void {
    this.getBoUI();
    this.getTopN();
    this.getBoSU();
    this.getGenreArr();
  }
  getBoUI() {
    this.http.get<BookDemo[]>(`${environment.apiUrl}home/basedOnYourInterests`).subscribe((res) => {
      this.YInterests = res;
      this.YInterests = this.sharedService.removeNoImage(this.YInterests);
      this.YInterests.forEach(e => {
        e.cover_page = this.sharedService.getLargeImg(e.cover_page, this.sharedService.getPosition(e.cover_page, "m/", 2))
      });
      let MostRatedC = [];
      for (let i = 0; i < this.YInterests.length / 3; i++) {
        MostRatedC[i] = this.YInterests.slice(i * 3, i * 3 + 3)
      }
      this.YInterests = MostRatedC;
    });
  }
  getTopN() {
    this.http.get<Book[]>(`${environment.apiUrl}home/top10`).subscribe(res => {
      this.topArr = res;
      this.topArr = this.sharedService.removeNoImage(this.topArr);
      this.topArr.forEach(e => {
        e.cover_page = this.sharedService.getLargeImg(e.cover_page, this.sharedService.getPosition(e.cover_page, "m/", 2))
      });

      let topNArrC = [];
      for (let i = 0; i < this.topArr.length / 2; i++) {
        topNArrC[i] = this.topArr.slice(i * 2, i * 2 + 2)
      }
      this.topArr = topNArrC;
    })
  }
  getBoSU() {
    this.http.get<Book[]>(`${environment.apiUrl}home/recommendBySimilarUsers`).subscribe(res => {
      this.BoSU = res;
      this.BoSU = this.sharedService.removeNoImage(this.BoSU);
      this.BoSU.forEach(e => {
        e.cover_page = this.sharedService.getLargeImg(e.cover_page, this.sharedService.getPosition(e.cover_page, "m/", 2))
      });

      let BoSUC = [];
      for (let i = 0; i < this.BoSU.length / 3; i++) {
        BoSUC[i] = this.BoSU.slice(i * 3, i * 3 + 3)
      }
      this.BoSU = BoSUC;
    })
  }
  getGenres(s: string) {
    let arr = s.replace(/[{}']/gi, "").split(',')
    return arr.slice(0, 3)
  }
  getBookTitle(s: any) {
    let arr = s.split(/[{,:(]/gi)
    return arr[0];
  }
  goToBookPage(book: any) {
    this.moveBook.transBook(book);
    this.router.navigate(['app/book']).then();
  }
  getGenreArr(){
    let allInt = localStorage.getItem('interests').replace(/[{}']/gi, "").split(',')
    let names =[];
    let arrOfGen =[];
    allInt.forEach(i=>{
      let arr = [];
      this.http.get<BookDemo[]>(`${environment.apiUrl}search?domain=genre&query=${i}`).subscribe((res) => {
        arr = res;
        arr = this.sharedService.removeNoImage(arr);
        arr.forEach(e => {
          e.cover_page = this.sharedService.getLargeImg(e.cover_page, this.sharedService.getPosition(e.cover_page, "m/", 2))
        });
        let C = [];
        let x = 3
        for (let i = 0; i <  5*x/x; i++) {
          C[i] = arr.slice(i * x, i * x + x)
        }
        arr = C;
        names.push(i);
        arrOfGen.push(arr);
      });
    })
    this.allGenreName =names;
    this.allGenreArr = arrOfGen;
  }
}
