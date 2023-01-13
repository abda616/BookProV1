import { AfterViewInit, Component, OnInit } from '@angular/core';
import { searchDataTransferService } from '../services/Transfer/search-data-transfer.service';
import { environment } from 'src/environments/environment.prod';
import { SharedServiceService } from '../services/shared-service.service';
import { Book, ownedBooks } from '../shared/Interfaces/Book';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from '../services/message/messages.service';
import { ExchangeService } from '../services/Exchange/exchange.service';
import { BookDataService } from '../services/Transfer/book-data.service';
@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css'],
})
export class MyLibraryComponent implements OnInit, AfterViewInit {
  sectionsArr = ['My Books', 'Favorite Books', 'Trade List'];
  desiredLibrary: string = this.sectionsArr[0];
  ownedBooks: ownedBooks[];
  ownedObj = [];
  favoriteBooks = [];
  favoritesIds = [];
  tradeList = [];
  isAvailable: boolean = false;

  constructor(
    private search: searchDataTransferService,
    private http: HttpClient,
    private sharedService: SharedServiceService,
    private messageService: MessagesService,
    private exchageService: ExchangeService,
    private bookDataService: BookDataService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search.updatePosition(true);
    }, 0);
  }

  ngOnInit(): void {
    this.getOwnedBooks();
    this.getFavoriteBooks();
  }
  //change the targeted library
  changeTarget(type) {
    this.desiredLibrary = type;

    if (type == this.sectionsArr[0]) {
      this.getOwnedBooks();
    } else if (type == this.sectionsArr[1]) {
      this.getFavoriteBooks();
    } else if (type == this.sectionsArr[2]) {
      2;
      return this.getTradeList();
    }
    return '';
  }
  //get the owned books
  getOwnedBooks() {
    this.http
      .get<ownedBooks[]>(environment.apiUrl + 'profile/owned')
      .subscribe((res) => {
        this.ownedBooks = res;
        this.ownedBooks = this.sharedService.removeNoImage(this.ownedBooks);
      });
  }
  //get favorite books
  getFavoriteBooks() {
    this.http
      .get<ownedBooks[]>(environment.apiUrl + 'profile/favorites')
      .subscribe((res) => {
        this.favoriteBooks = res;
        this.favoriteBooks = this.sharedService.removeNoImage(
          this.favoriteBooks
        );
      });
  }
  //get tradeList
  getTradeList(newBook?) {
    ///check if the trade array is empty at first to avoide duplication
    if (this.tradeList.length == 0) {
      this.ownedBooks.forEach((e) => {
        if (e.avaliable) this.tradeList.push(e); //if its available add it to trade list
      });
    } else {
      //if its not empty check weather the passed book is already in the tradelist
      if (newBook) {
        let bookFound = false;
        this.tradeList.forEach((e) => {
          if (e.id == newBook.id) bookFound = true;
        });
        //if its not found push it to the trade list
        if (!bookFound) {
          this.tradeList.push(newBook);
        }
      }
    }

    return this.tradeList;
  }
  //add the  books to tradeLIST
  addToTrade(obj, availablity): void {
    this.bookDataService.tradeThisBook(obj.id, availablity).subscribe((res) => {
      console.log(res);
    });
    //loop over the array and check if the passed object from the html is the same as the obj in the owned array then make it available
    this.ownedBooks.forEach((e) => {
      if (e.id == obj.id) {
        e.avaliable = !e.avaliable;
      } //if its not available remove it from the trade list
      if (!e.avaliable) {
        this.removeItemFromTrade(obj);
      }
    });
    this.getTradeList(obj);
  }
  //just a simple function to remove the item using the filter method
  removeItemFromTrade(item) {
    this.tradeList = this.tradeList.filter((e) => {
      return !item;
    });
  }

  //the final function to get the data and the final results to the html
  getData(type?) {
    if (type == this.sectionsArr[0]) {
      return this.ownedBooks;
    } else if (type == this.sectionsArr[1]) {
      // console.log(this.favoriteBooks)
      return this.favoriteBooks;
    } else if (type == this.sectionsArr[2]) {
      return this.tradeList;
    }
    return '';
  }
}
