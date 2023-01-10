import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {BooInfoService} from '../services/boo-info.service';
import {BookDataService} from "../services/Transfer/book-data.service";
import { BookDemo } from '../shared/Interfaces/BookDemo';

@Component({
  selector: 'app-my-book-info',
  templateUrl: './book-Info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class MyBookInfoComponent implements OnInit,AfterViewInit {
  currentBookInfo: any = '';
  similarAuthorBooks = []
  counter = 3;
  stars = [1, 2, 3, 4, 5]
  headsInTop: string[] = ["Reader Also Liked", "From The Same Author", "Based On Similar Users"];
 
  right = true


  constructor(private bookService: BooInfoService,
     private movedBook: BookDataService,
     private http:HttpClient,

    ) {
  }

  ngOnInit(): void {
    this.movedBook.bookData.subscribe(data => {
      this.currentBookInfo = data
      console.log(data)
    })
    // this.similarAuthorService();
  }
  ngAfterViewInit(): void {
   
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
