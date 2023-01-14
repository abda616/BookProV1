import {AfterViewInit, Component, OnInit,} from '@angular/core';
import {SharedServiceService} from '../services/shared-service.service';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import {BookDataService} from "../services/Transfer/book-data.service";
import {Router} from "@angular/router";
import {MainService} from "../services/Main/main.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],

})
export class MainPageComponent implements OnInit, AfterViewInit {
  constructor(private service: MainService, private sharedService: SharedServiceService,
              private search: searchDataTransferService,
              private moveBook: BookDataService, private router: Router) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search.updatePosition(true);
    }, 0);

    if (localStorage.getItem('interests')) {
      this.getGenreArr()
    } else {
      setTimeout(() => {
        this.getGenreArr()
      }, 4000)
    }
  }

  headsInTop: string[] = ["Top Rated Book", "Based On Your Interests", "Based On Similar Users"];

  topArr = [];
  YInterests = [];
  BoSU = [];
  allGenreName = [];
  allGenreArr = [];

  ngOnInit(): void {
    this.getBoUI();
    this.getTopN();
    this.getBoSU();
    this.getGenreArr();
  }

  getBoUI() {
    this.service.basedInYourInterst().subscribe((res) => {
      this.YInterests = res;
      this.YInterests = this.sharedService.removeNoImage(this.YInterests);
      let MostRatedC = [];
      for (let i = 0; i < this.YInterests.length / 3; i++) {
        MostRatedC[i] = this.YInterests.slice(i * 3, i * 3 + 3)
      }
      this.YInterests = MostRatedC;
    });
  }

  getTopN() {
    this.service.topBook().subscribe((res) => {
      this.topArr = res;
      this.topArr = this.sharedService.removeNoImage(this.topArr);
      let topNArrC = [];
      for (let i = 0; i < this.topArr.length / 2; i++) {
        topNArrC[i] = this.topArr.slice(i * 2, i * 2 + 2)
      }
      this.topArr = topNArrC;
    })
  }

  getBoSU() {
    this.service.basedOnSimUser().subscribe((res) => {
      this.BoSU = this.sharedService.removeNoImage(res);
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

  goToBookPage(book: number) {
    this.moveBook.transBook(book);
    this.router.navigate(['app/book']).then();
  }

  getGenreArr() {
    let allInt = localStorage.getItem('interests').replace(/[{}']/gi, "").split(',')
    let names = [];
    let arrOfGen = [];
    allInt.forEach(i => {
      let arr = [];
      this.service.searchBy(i,'genre').subscribe((res) => {
        arr = this.sharedService.removeNoImage(res);
        let C = [];
        let x = 3
        for (let i = 0; i < 5 * x / x; i++) {
          C[i] = arr.slice(i * x, i * x + x)
        }
        arr = C;
        names.push(i);
        arrOfGen.push(arr);
      });
    })
    this.allGenreName = names;
    this.allGenreArr = arrOfGen;
  }
}
