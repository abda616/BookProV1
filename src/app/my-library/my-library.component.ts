import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import { environment } from 'src/environments/environment.prod';
import { SharedServiceService } from '../services/shared-service.service';
import { Book, ownedBooks } from '../shared/Interfaces/Book';
import { userSignUp } from '../shared/Interfaces/userSignup';
@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css'],
})

export class MyLibraryComponent implements OnInit, AfterViewInit {
  sectionsArr = ["My Books", "Favorite Books", "Trade List"]
  desiredLibrary: string = this.sectionsArr[0];
  ownedBooks: ownedBooks[];

  favoriteBooksArr:Book[]=[];
  tradeList:ownedBooks[];
  uiData: ownedBooks[];
  getTarget: string = this.sectionsArr[0];
firstAndLastName:string;
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
this.getOwnedBooks()

  }

  getOwnedBooks() {
    this.getTarget = this.sectionsArr[0]
    this.http.get<ownedBooks[]>(`${environment.apiUrl}profile/owned`).subscribe((res) => {
     this.ownedBooks=res
   this.ownedBooks=this.sharedService.removeNoImage(this.ownedBooks)
  
    });
    return this.ownedBooks;
  }
  getFavoriteBooksIds(){
    this.getTarget=this.sectionsArr[1]
    this.http.get<ownedBooks[]>(environment.apiUrl+"profile/favorites").subscribe(res=>{
    this.getFavoriteBooksObj(res)
    })
  
  }
  getFavoriteBooksObj(idsArr){
   
     idsArr.forEach(e=>{
 
      this.http.get<Book>(environment.apiUrl+"book/getBook?book_id="+e).subscribe(res=>{
       
        this.favoriteBooksArr.push(res);
      })
    })
return this.favoriteBooksArr
  }
  changeTarget(type):void{
    this.desiredLibrary=type;
    console.log("TARGET CHANGED TO "+type) 
    if(type==this.sectionsArr[0]){
    this.getOwnedBooks()
     
    }
    else if(type==this.sectionsArr[1]){
     this.getFavoriteBooksIds()
    }
   
   
  }
  getData(type?){
    if(type==this.sectionsArr[0])return this.ownedBooks

  else if(type==this.sectionsArr[1])return this.favoriteBooksArr
  else if(type==this.sectionsArr[2]) return this.tradeList

    return ''

  }

}
