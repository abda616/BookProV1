import {AfterViewInit, Component, OnInit} from '@angular/core';
import {searchDataTransferService} from "../services/Transfer/search-data-transfer.service";

@Component({
  selector: 'app-trade-now',
  templateUrl: './trade-now.component.html',
  styleUrls: ['./trade-now.component.css']
})
export class TradeNowComponent implements OnInit,AfterViewInit {

  constructor(private search:searchDataTransferService) {
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.search.updatePosition(true);
    },0);
  }
  ngOnInit(): void {

  }


}
