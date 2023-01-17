import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ownedBooks} from '../shared/Interfaces/Book';
import {AuthService} from "../shared/Auth/auth.service";

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent implements OnInit, AfterViewInit {
  sectionsArr = ['My Books', 'Favorite Books', 'Trade List'];
  desiredLibrary: string = this.sectionsArr[0];
  ownedBooks: ownedBooks[];
  ownedObj = [];
  favoriteBooks = [];
  tradeList = [];
  userPic = this.auth.getUserPic();
  userName = this.auth.getUserName();

  constructor(private auth: AuthService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.auth.search.updatePosition(true);
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
      return this.getTradeList();
    }
    return '';
  }

  //get the owned books
  getOwnedBooks() {
    this.auth.bookService.allOwenedBook().subscribe((res) => {
      this.ownedBooks = res;
      this.ownedBooks = this.auth.shared.removeNoImage(this.ownedBooks);
    });
  }

  //get favorite books
  getFavoriteBooks() {
    this.auth.bookService.favorites().subscribe((res) => {
      this.favoriteBooks = res;
      this.favoriteBooks = this.auth.shared.removeNoImage(
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
        //if it is not found push it to the trade list
        if (!bookFound) {
          this.tradeList.push(newBook);
        }
      }
    }

    return this.tradeList;
  }

  //add the  books to tradeLIST
  addToTrade(obj, availablity): void {
    this.auth.bookService.tradeThisBook(obj.id, availablity).subscribe(
      (next) => {
        this.auth.toast.success(next['message'], "success")
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );
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
      return this.favoriteBooks;
    } else if (type == this.sectionsArr[2]) {
      return this.tradeList;
    }
    return '';
  }

  goToBook(book: number) {
    this.auth.bookService.transBook(book);
    this.auth.router.navigate(['app/book']).then();
  }

  addToOwn(id) {
    this.auth.bookService.addBookToOwn(id).subscribe(
      (next) => {
        this.auth.toast.success(next['message'], "success")
      },
      error => {
        this.auth.toast.error(error.error['message'], "error")
      }
    );
  }
}
