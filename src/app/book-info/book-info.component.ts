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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookInfoComponent implements OnInit, AfterViewInit {
  constructor(private bookDataService: BookDataService, private sharedService: SharedServiceService,
              private ref: ChangeDetectorRef, private http: HttpClient , private moveBook: BookDataService,
              private search: SearchPageService ,private  rout:Router) {}

  hasChecked = false;
  ngAfterViewChecked() {
    this.hasChecked = true;
  }
  ngDoCheck() {
    if (this.hasChecked) return;
    setInterval(() => {
      this.ref.markForCheck();
    }, 1000);
  }

  currentBookInfo: any = '';
  generalBookRate = 5;
  myBookRate = 0;
  GenraBook = '';
  currentAuthor = '';
  similarAuthorBooks = [];
  strings: string[] = ["From The Same Author"]
  right = true;
  allGenreName: string[] = [];
  allGenreArr = [];

  ngOnInit(): void {
    this.bookDataService.bookData.subscribe((id: number) => {
      if (id) {
        this.currentBookInfo = id
      } else {
        let x = localStorage.getItem('Book')
        if(x) {
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
      });
      this.bookDataService.getRate(id).subscribe(rate => {
        this.myBookRate = +rate['rating'];
      });
    });

  }


  addBookToOwened(id: number) {
    this.bookDataService.addBookToOwn(id);
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
      for (let i = 0; i < 5 * x / x; i++) {
        C[i] = data.slice(i * x, i * x + x)
      }
      this.similarAuthorBooks = C;
    })
  }

  getGenreArr() {
    let allInt = this.getGenres(this.GenraBook);
    let names = [];
    let arrOfGen = [];
    allInt.forEach(i => {
      let arr = [];
      this.http.get<Book[]>(`${environment.apiUrl}search?domain=genre&query=${i}`).subscribe((res) => {
        arr = res;
        arr = this.sharedService.removeNoImage(arr);
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

  scrollToAuth() {
    document.querySelector('#sameAuth').scrollIntoView({behavior: "smooth"})
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.similarAuthorService(this.currentAuthor);
      this.getGenreArr();
      setTimeout(() => {
        this.strings.concat(this.allGenreName);
      }, 2000);
    }, 2000)
  }

  goToBookPage(book: number) {
    this.moveBook.transBook(book);
  }
}
