import { HttpClientModule,HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MainPageService} from "../services/main-page.service";
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";
import {Book} from "../shared/Interfaces/Book";
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css'],
  providers:[MainPageService]
})
export class MyLibraryComponent implements OnInit,AfterViewInit {
  data:object;
 damn=[1,2,3,4,5];
  constructor(private search:searchDataTransferService,
    private http:HttpClient,

    ) {
  }
  ngAfterViewInit(): void {
    this.test()
    setTimeout(()=>{
      this.search.updatePosition(true);
    },0)
  }
  ngOnInit(): void {

  }
  test(){
    this.http.get<Book>("http://176.29.9.132/python/topn").subscribe(res=>{
      this.data=res;
      console.log(this.data)
    })
  }
}