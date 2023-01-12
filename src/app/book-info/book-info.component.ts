import {ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit, AfterViewInit} from '@angular/core';
import {BookDataService} from "../services/Transfer/book-data.service";
import {SharedServiceService} from "../services/shared-service.service";
import {Book} from "../shared/Interfaces/Book";
import {SearchPageService} from "../services/search.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-my-book-info',
  templateUrl: './book-Info.component.html',
  styleUrls: ['./book-info.component.css'],
})
export class MyBookInfoComponent implements OnInit {
  avaliable: any;
  constructor(private bookDataService: BookDataService, private sharedService: SharedServiceService,
              private ref: ChangeDetectorRef, private http: HttpClient, private moveBook: BookDataService,
              private search: SearchPageService, private rout: Router) {
  }

  currentBookInfo: any = '';
  generalBookRate = 5;
  myBookRate = 0;
  GenraBook = '';
  currentAuthor = '';
  similarAuthorBooks = [];
  right = true;
  allGenreName: string[] = [];
  allGenreArr = [];
  isOwened;

  ngOnInit(): void {
    this.clear();
    this.bookDataService.bookData.subscribe((id: number) => {
      if (id) {
        this.currentBookInfo = id
      } else {
        let x = localStorage.getItem('Book')
        if (x) {
          id = +(x);
          this.currentBookInfo = id
        } else this.rout.navigate(['']).then()
      }
      this.bookDataService.getBook(id).subscribe((bookdata) => {
        bookdata["coverPage"] = this.sharedService.getLargeImg(bookdata["coverPage"], this.sharedService.getPosition(bookdata["coverPage"], "m/", 2))
        this.currentBookInfo = bookdata;
        this.generalBookRate = bookdata['rating']['average_rating'];
        this.currentAuthor = bookdata['author'];
        this.GenraBook = bookdata['genres'];
        this.similarAuthorService(this.currentAuthor);
        this.getGenreArr();
      });
      this.bookDataService.isOwenedBook(id).subscribe((resp) => {
        let data: any;
        data=resp;
        for (let dataKey of data) {
          if (id == dataKey['book']['id']) {
            this.isOwened = true;
            this.avaliable = dataKey['avaliable']
          }
        }
      });
      this.bookDataService.getRate(id).subscribe(rate => {
        this.myBookRate = +rate['rating'];
      });
    });
  }


  tradeBookUOwened(id,av){
    this.bookDataService.tradeThisBook(id,av)
  }

  setRate(rate: number, id: number) {
    this.myBookRate = rate;
    this.bookDataService.setRate(rate, id);
  }

  getRate() {
    if (this.myBookRate > 0) {
      return this.myBookRate;
    } else return 0;
  }

  getGenres(s: string) {
    let arr = s.replace(/[{}']/gi, "").split(',')
    return arr.sort()
  }
  similarAuthorService(s: string) {
    this.search.searchBy(s, 'author').subscribe(data => {
      data = this.sharedService.removeNoImage(data);
      let C = [];
      let x = 2;
      let len = data.length % 2 == 0 ? data.length : data.length + 1;
      for (let i = 0; i < len / x; i++) {
        C[i] = data.slice(i * x, i * x + x)
      }
      this.similarAuthorBooks = C;
    })
  }

  getGenreArr() {
    let allInt = this.getGenres(this.GenraBook);
    allInt.forEach(i => {
      let arr = [];
      this.http.get<Book[]>(`${environment.apiUrl}search?domain=genre&query=${i}`).subscribe((res) => {
        arr = res;
        arr = this.sharedService.removeNoImage(arr);
        let C = [];
        let x = 2
        for (let i = 0; i < 5 * x / x; i++) {
          C[i] = arr.slice(i * x, i * x + x)
        }
        arr = C;

        this.allGenreName.push(i);
        this.allGenreArr.push(arr);
      });
    })
  }
  scrollToAuth() {
    document.querySelector('#sameAuth').scrollIntoView({behavior: "smooth"})
  }
  goToBookPage(book: number) {
    this.moveBook.transBook(book);
    this.rout.navigate(['app/book']).then();
  }

  goToTrade() {
    this.rout.navigate(['app/trade']).then()
  }
  private clear() {
    this.currentAuthor = ''
    this.similarAuthorBooks = []
    this.allGenreName = [];
    this.allGenreArr = [];
  }
  addBookToOwened(id: number) {
    this.bookDataService.addBookToOwn(id);
  }
  removeFromOwened(id) {
    this.bookDataService.removeBookFromOwn(id);
  }
}
