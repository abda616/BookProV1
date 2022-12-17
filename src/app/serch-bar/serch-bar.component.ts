import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serch-bar',
  templateUrl: './serch-bar.component.html',
  styleUrls: ['./serch-bar.component.css']
})
export class SerchBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  searchOption=['title','author','genre','description']
  searchFor:string;
  searchValue = '';
}
