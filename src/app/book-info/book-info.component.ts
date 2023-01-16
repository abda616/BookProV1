import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BookDataService} from "../services/Transfer/book-data.service";
import {SharedServiceService} from "../services/shared-service.service";
import {Book} from "../shared/Interfaces/Book";
import {Router} from "@angular/router";
import {MainService} from "../services/Main/main.service";
import {AuthService} from "../shared/Auth/auth.service";
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";

@Component({
  selector: 'app-my-book-info',
  templateUrl: './book-Info.component.html',
  styleUrls: ['./book-info.component.scss'],
})
export class MyBookInfoComponent implements OnInit {
  recBySB: any[];

  constructor(private bookDataService: BookDataService, private sharedService: SharedServiceService,
              private ref: ChangeDetectorRef, private moveBook: BookDataService,
              private search: MainService, private rout: Router,
              private auth: AuthService, private position: searchDataTransferService) {
  }

  avaliable: any;
  currentBookInfo: any = '';
  generalBookRate = 5;
  myRateToTheBook = 0;
  GenraBook = '';
  currentAuthor = '';
  similarAuthorBooks = [];
  right = true;
  allGenreName: string[] = [];
  allGenreArr = [];
  isOwened;
  ownedIdNumber;
  bookId;

  private clear() {
    this.currentAuthor = ''
    this.similarAuthorBooks = []
    this.allGenreName = [];
    this.allGenreArr = [];
    this.recBySB = [];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.position.updatePosition(true);
    }, 0);
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
        this.bookId = bookdata['id'];
        this.GenraBook = bookdata['genres'];

        this.similarAuthorService(this.currentAuthor);
        this.getGenreArr();
        this.getRecommendBySimilarBook(this.bookId);
      });
      this.isOwnedBook(id);
      this.bookDataService.getRate(id).subscribe(rate => {
        this.myRateToTheBook = +rate['rating'];
      });
    });
  }

  private isOwnedBook(id: number) {
    this.bookDataService.isOwenedBook(id).subscribe((resp) => {
      let data: any;
      data = resp;
      for (let dataKey of data) {
        if (id == dataKey['book']['id']) {
          this.isOwened = true;
          this.avaliable = dataKey['avaliable']
          this.ownedIdNumber = dataKey['id']
        }
      }
    });
  }

  tradeBookUOwened(id, av) {
    this.bookDataService.tradeThisBook(id, av).subscribe(
      (next) => {
        this.avaliable = !this.avaliable;
        this.auth.toast.success(next['message'], "success")
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );


  }

  setRate(rate: number, id: number) {
    this.bookDataService.setRate(rate, id).subscribe(
      (next) => {
        this.myRateToTheBook = rate;
        this.auth.toast.success(next['message'], "success")
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );
  }

  addBookToOwened(id: number) {
    this.isOwened = !this.isOwened;
    this.bookDataService.addBookToOwn(id).subscribe(
      (next) => {
        this.auth.toast.success(next['message'], "success")
        this.isOwnedBook(id);
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );
  }

  removeFromOwened(id) {
    this.isOwened = !this.isOwened;
    this.bookDataService.removeBookFromOwn(id).subscribe(
      (next) => {
        this.auth.toast.success(next['message'], "success")
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );
  }

  getRate() {
    if (this.myRateToTheBook > 0) {
      return this.myRateToTheBook;
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
      this.search.searchBy(i, 'genre')
        .subscribe((res) => {
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

  scrollToAuth(ele:string) {
    document.querySelector(`#${ele}`).scrollIntoView({behavior: "smooth"})
  }

  goToBookPage(book: number) {
    this.moveBook.transBook(book);
    this.rout.navigate(['app/book']).then();
  }

  goToTrade() {
    this.rout.navigate(['app/trade']).then()
  }

  getRecommendBySimilarBook(bookId) {
    this.auth.bookService.recommendBySimilarBook(bookId).subscribe((res) => {
      res = this.sharedService.removeNoImage(res);
      let C = [];
      let x = 2;
      let len = res.length % 2 == 0 ? res.length : res.length + 1;
      for (let i = 0; i < len / x; i++) {
        C[i] = res.slice(i * x, i * x + x)
      }
      this.recBySB = C
      console.log(C);
    })

  }
}
