import {AfterViewInit, Component, OnInit,} from '@angular/core';
import {AuthService} from "../shared/Auth/auth.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],

})
export class MainPageComponent implements OnInit, AfterViewInit {
  constructor(private auth: AuthService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.auth.search.updatePosition(true);
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
  }

  getBoUI() {
    this.auth.main.basedInYourInterest().subscribe((res) => {
      this.YInterests = res;
      this.YInterests = this.auth.shared.removeNoImage(this.YInterests);
      let MostRatedC = [];
      for (let i = 0; i < this.YInterests.length / 3; i++) {
        MostRatedC[i] = this.YInterests.slice(i * 3, i * 3 + 3)
      }
      this.YInterests = MostRatedC;
    });
  }

  getTopN() {
    this.auth.main.topBook().subscribe((res) => {
      this.topArr = res;
      this.topArr = this.auth.shared.removeNoImage(this.topArr);
      let topNArrC = [];
      for (let i = 0; i < this.topArr.length / 2; i++) {
        topNArrC[i] = this.topArr.slice(i * 2, i * 2 + 2)
      }
      this.topArr = topNArrC;
    })
  }

  getBoSU() {
    this.auth.main.basedOnSimUser().subscribe((res) => {
      this.BoSU = this.auth.shared.removeNoImage(res);
      let BoSUC = [];
      for (let i = 0; i < this.BoSU.length / 3; i++) {
        BoSUC[i] = this.BoSU.slice(i * 3, i * 3 + 3)
      }
      this.BoSU = BoSUC;
    })
  }

  getGenres(s: string) {
    let arr = s.replace(/[{}']/gi, "").split(',')
    return arr.slice(0, 1)
  }

  getBookTitle(s: any) {
    let arr = s.split(/[{,:(]/gi)
    return arr[0];
  }

  goToBookPage(book: number) {
    this.auth.bookService.transBook(book);
    this.auth.router.navigate(['app/book']).then();
  }

  getGenreArr() {
    let allInt = localStorage.getItem('interests').replace(/[{}']/gi, "").split(',')
    let names = [];
    let arrOfGen = [];
    if (allInt.length > 1)
      allInt.forEach(i => {
        let arr = [];
        this.auth.main.searchBy(i, 'genre').subscribe((res) => {
          arr = this.auth.shared.removeNoImage(res);
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
