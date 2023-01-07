import {Component, OnInit} from '@angular/core';
import {BooInfoService} from '../services/boo-info.service';
import {BookDataService} from "../services/Transfer/book-data.service";

@Component({
  selector: 'app-my-book-info',
  templateUrl: './book-Info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class MyBookInfoComponent implements OnInit {
  currentBookInfo: any = '';
  similarAuthorBooks = []
  counter = 3;
  stars = [1, 2, 3, 4, 5]
  headsInTop: string[] = ["Reader Also Liked", "From The Same Author", "Based On Similar Users"];
 
  right = true


  constructor(private bookService: BooInfoService, private movedBook: BookDataService) {
  }

  ngOnInit(): void {
    this.movedBook.bookData.subscribe(data => {
      this.currentBookInfo = data
    })
    // this.similarAuthorService();
  }

  onBtnDown() {
    console.log(this.counter)
    if (this.counter > 5) this.counter = 0;
    this.counter++;
  }

  localRate = 0;

  setRate(i: number) {
    this.localRate = i;
    console.log(i);
  }

  getGenres(s: string) {
    let arr = s.replace(/[{}']/gi, "").split(',')
    return arr.sort()
  }

  getRate() {
    if (this.localRate) {
      console.log("rate lev " + this.localRate)
      return this.localRate;
    } else return 0;
  }
}
