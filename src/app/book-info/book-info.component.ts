import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
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
  booksDemo = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
    {
      title: "thE SUBTLE art",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
    {
      title: "gasby",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
    {
      title: "12 rules",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
    {
      title: "mohamad",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
    {
      title: "khaldouns",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
    {
      title: "ahmad",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
    {
      title: "essa",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
    {
      title: "hamza",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
    {
      title: "abd",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
    {
      title: "rand",
      author: "James Clear",
      imgSrc: "./assets/picture/atomic.jpg",
      rating: "4.5",
      genres:
        [
          "Self-Help"
          ,
          "non-fiction"
        ],
      plot: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
      pages: 350,
      language: "English",
      dateOfPublish: "10-sep-2017"
    },
  ]
  headsInTop: string[] = ["Reader Also Liked", "From The Same Author", "Based On Similar Users"];
  images = [1, 2, 3]
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
