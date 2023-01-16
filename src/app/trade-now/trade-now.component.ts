import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { AuthService } from '../shared/Auth/auth.service';

@Component({
  selector: 'app-trade-now',
  templateUrl: './trade-now.component.html',
  styleUrls: ['./trade-now.component.scss'],
})
export class TradeNowComponent implements OnInit, AfterViewInit {
  headsInTop: string[] = ['Your Trade List', 'Discover Books'];
  yourTradeList = [];
  otherBooksArr: any = [];
  tradeToggleBtn =  false;
  exchangeToggleBtn = false
  currentExchangeBook;
  currentBookObj;
  otherBookObj:any;
hisUserName=''
  firstName=JSON.parse(localStorage.getItem("userData"))['userName']
  

  initExchange: boolean = false;
  onExchange: boolean = false;
  selectedFromTrade: boolean = false;
  selectedFromOffers: boolean = false;
  
  @ViewChild('scrollTop') scrollTop: ElementRef;
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
    });
    return this.yourTradeList;
  }

  getOtherData() {
    this.auth.exchange.booksForExchange().subscribe((v:any) => {
      v.forEach(e=>{
e['his_book_cover_image']=this.auth.shared.getLargeImg(e["his_book_cover_image"], this.auth.shared.getPosition(e["his_book_cover_image"], "m/", 2))
       })
      this.otherBooksArr = v;
     
      console.log(this.otherBooksArr);
    });
  }

  goToBookPage(book: number) {
    this.auth.bookService.transBook(book);
    this.auth.router.navigate(['app/book']).then();
  }
setCurrentBook(book){
this.currentBookObj=book;
}
setOtherBook(book){
  this.otherBookObj=book;
  this.hisUserName=this.otherBookObj.his_username
}

  getData() {
    console.log(this.yourTradeList)
    return this.yourTradeList;
  }

  initializeExchange(myBook, hisBook) {
    this.auth.exchange.initializeExchange(myBook, hisBook).subscribe(
      (next) => {
        this.auth.toast.success(next['message'], 'success');
      },
      (error) => {
        this.auth.toast.error(error.error['message'], 'error');
      }
    );
  }
}
