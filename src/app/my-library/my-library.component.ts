import { HttpClientModule,HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import {Book} from "../shared/Interfaces/Book";
import { environment } from 'src/environments/environment.prod';
import { SharedServiceService } from '../services/shared-service.service';
import { BookDemo, ownedBooks } from '../shared/Interfaces/BookDemo';
@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css'],

})
export class MyLibraryComponent implements OnInit,AfterViewInit {
  data:object;
 damn=[0,1,2,3,4,5];
 YInterests:ownedBooks
  constructor(private search:searchDataTransferService,
    private http:HttpClient,
    private sharedService:SharedServiceService,
   

    ) {
  }
  ngAfterViewInit(): void {
 
    setTimeout(()=>{
      this.search.updatePosition(true);
    },0)
  }
  ngOnInit(): void {  
// this.getBoUI()
  }

  // getBoUI() {
  //   this.http.get<ownedBooks[]>(`${environment.apiUrl}profile/owned`).subscribe((res) => {
  //     this.YInterests = res;
  //     console.log(this.YInterests)
  //     this.YInterests = this.sharedService.removeNoImage(this.YInterests);
  //     this.YInterests.forEach(e => { 
  //       e.cover_page = this.sharedService.getLargeImg(e.cover_page, this.sharedService.getPosition(e.cover_page, "m/", 2))
  //     });
  //     let MostRatedC = [];
  //     for (let i = 0; i < this.YInterests.length/8; i++) {
  //       MostRatedC[i] = this.YInterests.slice(i * 8, i * 8 + 8)
  //     }
  //     this.YInterests = MostRatedC;
  //   });
  // }
}