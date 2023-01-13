import {AfterViewInit, Component, OnInit} from '@angular/core';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import {environment} from 'src/environments/environment.prod';
import {SharedServiceService} from '../services/shared-service.service';
import {Book, ownedBooks} from '../shared/Interfaces/Book';
import {index} from 'cheerio/lib/api/traversing';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css'],
})

export class MyLibraryComponent implements OnInit, AfterViewInit {
  sectionsArr = ["My Books", "Favorite Books", "Trade List"]
  desiredLibrary: string = this.sectionsArr[0];
  ownedBooks: ownedBooks[];
  ownedObj = []
  favoriteBooks = [];
  favoritesIds = [];
  tradeList = [];
  isAvailable: boolean = false;

  constructor(private search: searchDataTransferService,
              private http: HttpClient,
              private sharedService: SharedServiceService,
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search.updatePosition(true);
    }, 0)
  }

  ngOnInit(): void {
    this.getOwnedBooks();
    this.getFavoriteBooks();


  }

  changeTarget(type) {
    this.desiredLibrary = type;

    if (type == this.sectionsArr[0]) {
      this.getOwnedBooks()
    } else if (type == this.sectionsArr[1]) {
      this.getFavoriteBooks()
    } else if (type == this.sectionsArr[2]) {
      2
      return this.getTradeList();
    }
    return ''

  }

  getOwnedBooks() {
    this.http.get<ownedBooks[]>(environment.apiUrl + "profile/owned").subscribe(res => {
      this.ownedBooks = res
      this.ownedBooks = this.sharedService.removeNoImage(this.ownedBooks);

    })

  }

  getFavoriteBooks() {
    this.http.get<ownedBooks[]>(environment.apiUrl + "profile/favorites").subscribe(res => {
      this.favoriteBooks = res;
      this.favoriteBooks = this.sharedService.removeNoImage(this.favoriteBooks)
    })

  }

  getTradeList() {
    if (this.tradeList.length > 0) {
      this.ownedBooks.forEach(e => {
        this.tradeList.forEach(ele => {
          if (e.avaliable && e.id != ele.id) {
            this.tradeList.push(e)
          }
        })
      })
    } else {
      this.ownedBooks.forEach(e => {
        if (e.avaliable) {
          this.tradeList.push(e)
        }

      })
    }
    return this.tradeList
  }

//   async getTradeList(owededArr){

// owededArr.forEach(e=>{
//   if(e.available){
//     this.tradeList.push(e)
//   }
// })
// await console.log(this.tradeList)
//   }
  getData(type?) {
    if (type == this.sectionsArr[0]) {
      return this.ownedBooks;
    } else if (type == this.sectionsArr[1]) {
      // console.log(this.favoriteBooks)
      return this.favoriteBooks;
    } else if (type == this.sectionsArr[2]) {
      return this.tradeList
    }
    return ''
  }

  addToTrade(bookId, availablity): void {
    console.log(bookId, availablity)

    //  console.log(currentBook,bookId)
    let headers = {
      book_id: bookId,
      available: !availablity,
    }
    this.http.put(`${environment.apiUrl}profile/makeBookAvailable/book_id=${bookId}&available=${headers.available}`, null).subscribe(res => {
      console.log(res)
    })
  }
}
