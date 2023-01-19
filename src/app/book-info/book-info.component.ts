import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Book} from "../shared/Interfaces/Book";
import {AuthService} from "../shared/Auth/auth.service";


@Component({
  selector: 'app-my-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss'],
})
export class MyBookInfoComponent implements OnInit,AfterViewInit {
  recBySB: any[];

  constructor(private ref: ChangeDetectorRef, private auth: AuthService,) {}


  available: any;
  currentBookInfo: any = '';
  generalBookRate = 5;
  myRateToTheBook = 0;
  GeneraBook = '';
  currentAuthor = '';
  similarAuthorBooks = [];
  right = true;
  allGenreName: string[] = [];
  allGenreArr = [];
  isOwned;
  ownedIdNumber;
  bookId;

  private clear() {
    this.currentAuthor = ''
    this.similarAuthorBooks = []
    this.allGenreName = [];
    this.allGenreArr = [];
    this.recBySB = [];
    this.isOwned = null;
    this.ownedIdNumber = null;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.auth.search.updatePosition(true);
    }, 0);

    this.clear();
    this.auth.bookService.bookData.subscribe((id: number) => {
      if (id) {
        this.currentBookInfo = id
      } else {
        let x = localStorage.getItem('Book')
        if (x) {
          id = +(x);
          this.currentBookInfo = id
        } else this.auth.router.navigate(['']).then(window.location.reload)
      }

      this.auth.bookService.getBook(id).subscribe((bookData) => {
        bookData["coverPage"] = this.auth.shared.getLargeImg(bookData["coverPage"], this.auth.shared.getPosition(bookData["coverPage"], "m/", 2))
        this.currentBookInfo = bookData;
        this.generalBookRate = bookData['rating']['average_rating'];
        this.currentAuthor = bookData['author'];
        this.bookId = bookData['id'];
        this.GeneraBook = bookData['genres'];
        this.similarAuthorService(this.currentAuthor);
        this.getRecommendBySimilarBook(this.bookId);
      });
      this.isOwnedBook(id);
      this.auth.bookService.getRate(id).subscribe(rate => {
        this.myRateToTheBook = +rate['rating'];
      });
    });
  }


  private isOwnedBook(id: number) {
    this.auth.bookService.isOwnedBook(id).subscribe((resp) => {
      let data: any;
      data = resp;
      for (let dataKey of data) {
        if (id == dataKey['book']['id']) {
          this.isOwned = true;
          this.available = dataKey['available']
          this.ownedIdNumber = dataKey['id']
        }
      }
    });
  }

  tradeBookUOwned(id, av) {
    this.auth.bookService.tradeThisBook(id, av).subscribe(
      (next) => {
        this.available = !this.available;
        this.auth.toast.success(next['message'], "success")
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );


  }

  setRate(rate: number, id: number) {
    this.auth.bookService.setRate(rate, id).subscribe(
      (next) => {
        this.myRateToTheBook = rate;
        this.auth.toast.success(next['message'], "success")
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );
  }

  addBookToOwned(id: number) {

    this.auth.bookService.addBookToOwn(id).subscribe(
      (next) => {
        this.isOwned = !this.isOwned;
        this.auth.toast.success(next['message'], "success")
        this.isOwnedBook(id);
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );
  }

  removeFromOwned(id) {

    this.auth.bookService.removeBookFromOwn(id).subscribe(
      (next) => {
        this.isOwned = !this.isOwned;
        this.auth.toast.success(next['message'], "success")
        this.isOwnedBook(id);
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
    this.auth.main.searchBy(s, 'author').subscribe(data => {
      data = this.auth.shared.removeNoImage(data);
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
    let allInt = this.getGenres(this.GeneraBook).slice(0,2);
    allInt.forEach(i => {
      let arr = [];
      this.auth.main.searchBy(i, 'genre')
        .subscribe((res) => {
          arr = res;
          arr = this.auth.shared.removeNoImage(arr);
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

  scrollToAuth(ele: string) {
    document.querySelector(`#${ele}`).scrollIntoView({behavior: "smooth"})
  }

  goToBookPage(book: number) {
    this.auth.bookService.transBook(book);
    this.auth.router.navigate(['app/book']).then(() => window.location.reload());
  }

  goToTrade() {
    this.auth.router.navigate(['app/trade']).then()
  }

  getRecommendBySimilarBook(bookId) {
    this.auth.bookService.recommendBySimilarBook(bookId).subscribe((res) => {
      res = this.auth.shared.removeNoImage(res);
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

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.getGenreArr();
    },5000)

  }
}
