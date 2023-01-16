import {AfterViewInit, Component, OnInit,} from '@angular/core';
import {AuthService} from '../shared/Auth/auth.service';

@Component({
  selector: 'app-trade-now',
  templateUrl: './trade-now.component.html',
  styleUrls: ['./trade-now.component.scss'],
})
export class TradeNowComponent implements OnInit, AfterViewInit {
  yourTradeList = [];
  otherBooksArr: any = [];
  tradeToggleBtn = false;
  exchangeToggleBtn = false
  currentBookObj;
  otherBookObj:any;
hisUserName=''
  firstName=JSON.parse(localStorage.getItem("userData"))['userName']
  initExchange: boolean = false;
  onExchange: boolean = false;
  longTrade=false;
  longExchange=false;
  constructor(private auth: AuthService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.auth.search.updatePosition(true);
    }, 0);
  }

  ngOnInit(): void {
    this.getYouTradeList();
    this.getOtherData();
  }

  getYouTradeList() {
    this.auth.bookService.allOwenedBook().subscribe((res) => {
      let ownedBooks = this.auth.shared.removeNoImage(res);
      let ownedBooksC = [];
      ownedBooks.forEach((e) => {
        if (e.avaliable == true) ownedBooksC.push(e);
      });
      this.yourTradeList = ownedBooksC;
      console.log(this.yourTradeList,"tradelist")
      if(this.yourTradeList.length>6) this.longTrade=true
    });
 
    
  }

  getOtherData() {
    this.auth.exchange.booksForExchange().subscribe((v: any) => {
      v.forEach(e => {
        e['his_book_cover_image'] = this.auth.shared.getLargeImg(e["his_book_cover_image"], this.auth.shared.getPosition(e["his_book_cover_image"], "m/", 2))
      })
      this.otherBooksArr = v;
      console.log(this.otherBooksArr);
      if(this.otherBooksArr.length>6)this.longExchange=true
    });
  }

  goToBookPage(book: number) {
    this.auth.bookService.transBook(book);
    this.auth.router.navigate(['app/book']).then();
  }

  setCurrentBook(book) {
    this.currentBookObj = book;
  }

  setOtherBook(book) {
    this.otherBookObj = book;
    this.hisUserName = this.otherBookObj.his_username
  }

  getData() {
    console.log(this.yourTradeList)
    return this.getYouTradeList();
  }

  initializeExchange(myBook, hisBook) {
    this.auth.exchange.initializeExchange(myBook, hisBook).subscribe(
      (next) => {
        this.auth.toast.success(next['message'], 'success');

        this.auth.exchange.exchangesFromMe().subscribe((x: any) => {
          let exId = null;
          x.forEach(e => {
            console.log(e.myBook.id);
            console.log(e.hisBook.id);
            /*if () {
              exId = e['id']
              console.log(exId)
              this.auth.message.setMessageID(exId, this.firstName);
              this.auth.router.navigate(['app/message']).then();
            }*/
          })
        })
      },
      (error) => {
        this.auth.toast.error(error.error['message'], 'error');
      }
    );
  }
}
