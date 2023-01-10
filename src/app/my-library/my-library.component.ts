import { HttpClientModule,HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import { environment } from 'src/environments/environment.prod';
import { SharedServiceService } from '../services/shared-service.service';
import { Book, ownedBooks } from '../shared/Interfaces/Book';
@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css'],
})

export class MyLibraryComponent implements OnInit, AfterViewInit {
  sectionsArr = ["My Books", "Favorite Books", "Trade List"]
  desiredLibrary: string = this.sectionsArr[0];
  ownedBooks: ownedBooks[];
  favoriteBooks: ownedBooks[];
  uiData: ownedBooks[];
  getTarget: string = this.sectionsArr[0];

  constructor(private search: searchDataTransferService,
              private http: HttpClient,
              private sharedService: SharedServiceService,
  ) {
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.search.updatePosition(true);
    },0)
  }
  ngOnInit(): void {  
this.getOwnedBooks()
  }

  getOwnedBooks() {
    this.getTarget=this.sectionsArr[0]
    this.http.get<ownedBooks[]>(`${environment.apiUrl}profile/owned`).subscribe((res) => {
     this.ownedBooks=res
   this.ownedBooks=this.sharedService.removeNoImage(this.ownedBooks)
    
      this.ownedBooks.forEach(e => { 
        e.book.coverPage = this.sharedService.getLargeImg(e.book.coverPage, this.sharedService.getPosition(e.book.coverPage, "m/", 2))
      });
    });
    return this.ownedBooks;
  }
  getFavoriteBooks(){
    this.getTarget=this.sectionsArr[1]
    this.http.get<ownedBooks[]>(`${environment.apiUrl}profile/favorites`).subscribe(res=>{
      this.favoriteBooks=res;
      
    })
    return this.favoriteBooks;
  }
  changeTarget(type){
    this.desiredLibrary=type;
    this.getData(type);
  }
  getData(type=this.sectionsArr[0]){
    
    if(type==this.sectionsArr[0]){
      console.log(this.ownedBooks)
      return this.ownedBooks;
    }
    else if(type==this.sectionsArr[1]){
      console.log(this.favoriteBooks)
      return this.favoriteBooks;
    }
    // else if(this.getTarget==this.sectionsArr[2]){
    //   this.desiredLibrary=this.getTarget;
    //   this.uiData=this.getFavoriteBooks()
    // }
    return ''
  }
}