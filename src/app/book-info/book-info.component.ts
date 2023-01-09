import {Component, OnInit} from '@angular/core';
import {BooInfoService} from '../services/boo-info.service';
import {BookDataService} from "../services/Transfer/book-data.service";
import {HttpClient} from "@angular/common/http";
import {SharedServiceService} from "../services/shared-service.service";

@Component({
  selector: 'app-my-book-info',
  templateUrl: './book-Info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class MyBookInfoComponent implements OnInit {
  constructor(private bookService: BooInfoService, private bookDataService: BookDataService,
              private shared: SharedServiceService) {
  }
  currentBookInfo: any = '';
  similarAuthorBooks = []
  headsInTop: string[] = ["Reader Also Liked", "From The Same Author", "Based On Similar Users"];

  right = true;
  bookRate = 0;



  ngOnInit(): void {
    this.bookDataService.bookData.subscribe((id: number) => {
      if (id) {
        this.currentBookInfo = id
      } else {
        id = +(localStorage.getItem('Book'))
        this.currentBookInfo = id
      }
      this.bookDataService.getBook(id).subscribe((bookdata) => {
        bookdata["coverPage"]= this.shared.getLargeImg(bookdata["coverPage"], this.shared.getPosition(bookdata["coverPage"], "m/", 2))
        this.currentBookInfo = bookdata;
      });
      console.log(this.currentBookInfo);
      this.bookDataService.getRate(id).subscribe(rate => {
        this.bookRate = +rate['rating'];
      })
    });

    // this.similarAuthorService();
  }
  addBookToOwened(id:number){
    this.bookDataService.addBookToOwn(id);
  }

  setRate(rate: number, id: number) {
    this.bookRate = rate;
    this.bookDataService.setRate(rate, id);
  }

  getRate() {
    if (this.bookRate > 0) {
      return this.bookRate;
    } else return 0;
  }
  getGenres(s: string) {
    let arr = s.replace(/[{}']/gi, "").split(',')
    return arr.sort()
  }

}
