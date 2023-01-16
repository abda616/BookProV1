import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/Auth/auth.service";

@Component({
  selector: 'app-trade-now',
  templateUrl: './trade-now.component.html',
  styleUrls: ["./trade-now.component.scss"]
})
export class TradeNowComponent implements OnInit, AfterViewInit {
  headsInTop: string[] = ["Your Trade List", "Discover Books"];
  yourTradeList = [];
  OtherBooks: any = [];


  constructor(private auth: AuthService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.auth.search.updatePosition(true);
    }, 0);
  }

  ngOnInit(): void {
    this.getYouTradeList()
    this.getOtherData()
  }

  getYouTradeList() {
    this.auth.bookService.allOwenedBook().subscribe(res => {
      let ownedBooks = this.auth.shared.removeNoImage(res)
      let ownedBooksC = [];
      ownedBooks.forEach(e => {
        if (e.avaliable == true)
          ownedBooksC.push(e);
      })
      this.yourTradeList = ownedBooksC;
      console.log(this.yourTradeList)
    })
    return this.yourTradeList;
  }

  getOtherData() {
    this.auth.exchange.booksForExchange().subscribe(v => {
      console.log(v)
      this.OtherBooks = v;
      console.log(this.OtherBooks)
    })
  }

  goToBookPage(book: number) {
    this.auth.bookService.transBook(book);
    this.auth.router.navigate(['app/book']).then();
  }

  onExchangeUi(elementId) {
    console.log(elementId)
  }

  getData() {
    return this.yourTradeList
  }
  initializeExchange(myBook, hisBook) {
    this.auth.exchange.initializeExchange(myBook, hisBook).subscribe(
      (next) => {
        this.auth.toast.success(next['message'], "success")
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );
  }
}
