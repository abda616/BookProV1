import {AfterViewInit, Component, OnInit} from '@angular/core';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import {ExchangeService} from "../services/Exchange/exchange.service";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ownedBooks } from '../shared/Interfaces/Book';
import {Router} from "@angular/router";
import {BookDataService} from "../services/Transfer/book-data.service";
import {SharedServiceService} from '../services/shared-service.service';

@Component({
  selector: 'app-trade-now',
  templateUrl: './trade-now.component.html',
  styleUrls: ['./trade-now.component.css']
})
export class TradeNowComponent implements OnInit,AfterViewInit {
headsInTop:string[]=["Your Trade List","Discover Books In Your City"];
yourTradeList2D:ownedBooks[]=[];

  constructor(private search:searchDataTransferService,
    private Ex:ExchangeService,
    private http:HttpClient,
    private moveBook: BookDataService, private router: Router,
    private sharedService: SharedServiceService,
   
    ) {
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.search.updatePosition(true);
    },0);
  }
  ngOnInit(): void {
    this.getTradeList()

  }
  getTradeList(){
    this.http.get<ownedBooks[]>(environment.apiUrl+"profile/owned").subscribe(res=>{
let ownedBooks=res;
ownedBooks=this.sharedService.removeNoImage(ownedBooks)
let currentTrade=[]
ownedBooks.forEach(e=>{
  if(e.avaliable){
    this.yourTradeList2D.push(e)
  }
  
})
console.log(this.yourTradeList2D)
if(this.yourTradeList2D.length>=3){
  for (let i = 0; i < this.yourTradeList2D.length / 3; i++) {
    currentTrade[i] = this.yourTradeList2D.slice(i * 3, i * 3 + 3)
  }
  this.yourTradeList2D=currentTrade;
}
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




}
