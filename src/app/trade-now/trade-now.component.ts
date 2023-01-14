import {AfterViewInit, Component, OnInit} from '@angular/core';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import {ExchangeService} from "../services/Exchange/exchange.service";
import {ownedBooks} from '../shared/Interfaces/Book';
import {Router} from "@angular/router";
import {BookDataService} from "../services/Transfer/book-data.service";
import {SharedServiceService} from '../services/shared-service.service';

@Component({
  selector: 'app-trade-now',
  templateUrl: './trade-now.component.html',
  styleUrls: ["./trade-now.component.scss"]
})
export class TradeNowComponent implements OnInit, AfterViewInit {
  headsInTop: string[] = ["Your Trade List", "Discover Books"];
  yourTradeList2D = [];
  OtherBooks = [];

  constructor(private search: searchDataTransferService,
              private Ex: ExchangeService,
              private moveBook: BookDataService, private router: Router,
              private sharedService: SharedServiceService,
  ) {
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.search.updatePosition(true);
    }, 0);

    this.Ex.booksForExchange().subscribe(v => {
      console.log('1')
      console.log(v)
    })
    this.Ex.exchangesFromMe().subscribe(v => {
      console.log('2')
      console.log(v)
    })
    this.Ex.exchangesFromPeople().subscribe(v => {
      console.log('3')
      console.log(v)
    })
  }

  ngOnInit(): void {
    this.getTradeList()

  }

  getTradeList() {
    this.moveBook.allOwenedBook().subscribe(res => {
      let ownedBooks = this.sharedService.removeNoImage(res)
      let ownedBooksC = [];
      ownedBooks.forEach(e => {
        if (e.avaliable == true)
          ownedBooksC.push(e);
      })
      ownedBooks = ownedBooksC;
      ownedBooksC = [];
      let x = 2;
      for (let i = 0; i < ownedBooks.length / x; i++) {
        ownedBooksC[i] = ownedBooks.slice(i * x, i * x + x)
      }
      this.yourTradeList2D = ownedBooksC;
      console.log(this.yourTradeList2D)
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

  goToDataPage(bookElement: any) {

  }
}
