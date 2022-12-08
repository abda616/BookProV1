import {Component, OnInit} from '@angular/core';
import {MainPageService} from "../services/main-page.service";

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css'],
  providers:[MainPageService]
})
export class MyLibraryComponent implements OnInit {
  ngOnInit(): void {
  }
  /*public arr:any[]=[]
  public firstIteration:any=[];
  public secondIteration:any=[];
  public thirdIteration:any=[];
  public fourthIteration:any=[];
  public fifthIteration:any=[];
  public requestTypes={
    recommendedByAuthor:"recommendByAuthor",
    recommendedBySimilarBooks:"recommendBySimilarBooks",
    recommendedByGenre:"recommendByGenre",
    mostRated:"mostRated"
  }
  constructor(private _genureService:MainPageService) {}

  ngOnInit(): void {
    this._genureService.getSimilar("Twilight")
      .subscribe(res=>{
        this.arr=res;
        this.arr.forEach((ele,index)=>{
          if(index<2){
            this.firstIteration.push(ele)
          }
          if(index>=2&&index<4){
            this.secondIteration.push(ele)
          }
          if(index>=4&&index<6){
            this.thirdIteration.push(ele)
          }
          if(index>=6&&index<8){
            this.fourthIteration.push(ele)

          }
          if(index>=8&&index<10){
            this.fifthIteration.push(ele)
          }

        })
        console.log(this.secondIteration)
      })
  }
  viewRightCard(){
  }*/
}
