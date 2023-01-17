import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Book} from "../shared/Interfaces/Book";
import {AuthService} from "../shared/Auth/auth.service";


@Component({
  selector: 'app-my-book-info',
  templateUrl: './book-Info.component.html',
  styleUrls: ['./book-info.component.scss'],
})
export class MyBookInfoComponent implements OnInit {
  recBySB: any[];

  constructor(private ref: ChangeDetectorRef, private auth: AuthService,) {
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
    this.isOwened = null;
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

      this.auth.bookService.getBook(id).subscribe((bookdata) => {
        bookdata["coverPage"] = this.auth.shared.getLargeImg(bookdata["coverPage"], this.auth.shared.getPosition(bookdata["coverPage"], "m/", 2))
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
      this.auth.bookService.getRate(id).subscribe(rate => {
        this.myRateToTheBook = +rate['rating'];
      });
    });
  }

  private isOwnedBook(id: number) {
    this.auth.bookService.isOwenedBook(id).subscribe((resp) => {
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
    this.auth.bookService.tradeThisBook(id, av).subscribe(
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

  addBookToOwened(id: number) {

    this.auth.bookService.addBookToOwn(id).subscribe(
      (next) => {
        this.isOwened = !this.isOwened;
        this.auth.toast.success(next['message'], "success")

        this.isOwnedBook(id);
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );
  }

  removeFromOwened(id) {

    this.auth.bookService.removeBookFromOwn(id).subscribe(
      (next) => {
        this.isOwened = !this.isOwened;
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
    let allInt = this.getGenres(this.GenraBook);
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
}
