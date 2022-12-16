import {Component, OnInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-my-book-info',
  templateUrl: './book-Info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class MyBookInfoComponent implements OnInit {
currentBookInfo={
  title:"Atomic Habits" ,
  author:"James Clear",
  ratings:"4.4",
  imgSrc:"./assets/picture/atomic.jpg"

}
similarAuthorArr=[]
counter=1;
 stars=[1,2,3,4,5]
 booksDemo=[{
  title:"Atomic Habits",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 {
  title:"thE SUBTLE art",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 {
  title:"gasby",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 {
  title:"12 rules",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 {
  title:"mohamad",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 {
  title:"khaldouns",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 ,
 {
  title:"ahmad",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 ,
 {
  title:"essa",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 ,
 {
  title:"hamza",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 ,
 {
  title:"abd",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 ,
 {
  title:"rand",
  author:"James Clear",
  imgSrc:"./assets/picture/atomic.jpg",
  rating:"4.5",
genres:
[
"Self-Help"
,
"non-fiction"
],
plot:"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you.",
pages:350,
language:"English",
dateOfPublish:"10-sep-2017"
 },
 ]
 
 imgPath= "https://books.google.com/books/publisher/content/images/frontcover/SSRGEAAAQBAJ?fife=w480-h690"
 headsInTop: string[] = [ "Reader Also Liked", "From The Same Author", "Based On Similar User"];
 images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
 images2 = [123, 14, 38, 63].map((n) => `https://picsum.photos/id/${n}/900/500`);
 images3 = [15, 134, 4, 434].map((n) => `https://picsum.photos/id/${n}/900/500`);
 allimg = [this.images, this.images2, this.images3];


 

 
  constructor() { }

  ngOnInit(): void {

  }

   onBtnDown(){
    console.log(this.counter)
    if(this.counter>5)this.counter=0;
this.counter++;
   }
  //  getSimilarBooks(currentBookInfo.title:""){
  //  this.bookInfo.getByAuthor()
  //   .subscribe(res=>{
  //  this.similarAuthorArr=res;   
  //  console.log(this.similarAuthorArr)
  //   })
  //  }


}
