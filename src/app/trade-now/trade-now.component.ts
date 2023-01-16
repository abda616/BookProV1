import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import {ExchangeService} from "../services/Exchange/exchange.service";
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
  yourTradeList = [];
  OtherBooks = [];
tradeToggleBtn="Show More"
exchangeToggleBtn="Show More"
currentExchangeBook;
currentBookObj;
initExchange:boolean=false
onExchange:boolean=false;
selectedFromTrade:boolean=false;
selectedFromOffers:boolean=false;
@ViewChild('scrollTop') scrollTop:ElementRef;
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
    /*this.Ex.exchangesFromMe().subscribe(v => {
      // console.log('2')
      // console.log(v)
    })
    this.Ex.exchangesFromPeople().subscribe(v => {
      // console.log('3')
      // console.log(v)
    })*/
  }

  ngOnInit(): void {
    this.getYouTradeList()
    this.getOtherData()
  }

  getYouTradeList() {
    this.moveBook.allOwenedBook().subscribe(res => {
      let ownedBooks = this.sharedService.removeNoImage(res)
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


  getBookTitle(book: number) :string {
    /*this.moveBook.getBook(book).subscribe((data)=>{
      title = data['title'];
      return title;
    })*/
    return '';
  }

  goToBookPage(book: number) {
    this.moveBook.transBook(book);
    this.router.navigate(['app/book']).then();
  }

  goToDataPage(bookElement: any) {

  }
  onExchangeUi(elementId?){
    let exchangeOffers=document.querySelector(".exchange-offers")
    if(elementId!="null"){
      let booksArr=document.querySelectorAll(".book");
      booksArr.forEach(e=>{
        if(e.id==elementId){
  this.currentExchangeBook=e;
        }
      })
      this.yourTradeList.forEach(e=>{
        if(e.id==elementId){
        this.currentBookObj=e;
        }
      })
      this.currentExchangeBook.classList.toggle("onExchange")
  this.onExchange=!this.onExchange
  exchangeOffers.classList.toggle("show-exchange-offers")
  if(exchangeOffers.classList.contains("show-exchange-offers")) this.initExchange=true
    
}
  
    
  }
  toggleTrade(contType){
    
    if(contType.classList.contains("trade-List-cont")){
      let tradeListCont=document.querySelector(".trade-List-cont");
      tradeListCont.classList.toggle("show-more-trade")
      if(tradeListCont.classList.contains("show-more-trade")){
        this.tradeToggleBtn="Show Less"
      } else this.tradeToggleBtn="Show More"
     
     
      console.log(tradeListCont)
  return this.tradeToggleBtn
    }else if (contType.classList.contains("exchangable-cont")){
      let exchangeCont=document.querySelector(".exchangable-cont");
      exchangeCont.classList.toggle("show-more-exchange")
      if(exchangeCont.classList.contains("show-more-exchange")){
        this.exchangeToggleBtn="Show Less"
      }else this.exchangeToggleBtn="Show More"
     
      console.log(exchangeCont)
  return this.exchangeToggleBtn
    }
    return ''
   
  }
  getData(){
    return this.yourTradeList
  }

  private getOtherData() {
    this.Ex.booksForExchange().subscribe(v => {
      console.log(v)
      this.OtherBooks= v;
      console.log(this.OtherBooks)
    })

  }
}
