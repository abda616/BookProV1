import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MessagesService} from "../services/message/messages.service";
import {Router} from "@angular/router";
import {val} from "cheerio/lib/api/attributes";
import {BookDataService} from "../services/Transfer/book-data.service";
import {SharedServiceService} from "../services/shared-service.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit,AfterViewInit {

  constructor(private message: MessagesService, private router: Router,
              private bookSer: BookDataService, private shared: SharedServiceService) {
  }

  conver;
  hisBookPic;
  myBookPic;
  conversationSation;
  sationID = JSON.parse(localStorage.getItem('conversation_ex_id'))['exchange_id'];
  firstUser = JSON.parse(localStorage.getItem('userData'))['userName'];
  newMessageText;

  ngOnInit(): void {
    this.message.dataID.subscribe(data => {
      if (data) this.conversationSation = data;
      else {
        let x = localStorage.getItem('conversation_ex_id')
        if (!x) this.router.navigate(['']).then();
        data = JSON.parse(x);
      }
      this.getMessages(data)
    });
    this.bookSer.getBook(+JSON.parse(localStorage.getItem('conversation_ex_id'))['his_book_id'])
      .subscribe((book) => {
        book["coverPage"] = this.shared.getLargeImg(book["coverPage"], this.shared.getPosition(book["coverPage"], "m/", 2))
        this.hisBookPic = book["coverPage"]
      });
    this.bookSer.getBook(+JSON.parse(localStorage.getItem('conversation_ex_id'))['my_book_id'])
      .subscribe((book) => {
        book["coverPage"] = this.shared.getLargeImg(book["coverPage"], this.shared.getPosition(book["coverPage"], "m/", 2))
        this.myBookPic = book["coverPage"]
      });
    setTimeout(() => {
      document.querySelector("#span-messaging").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }, 5000);
  }

  getMessages(messageData) {
    this.message.getConversation(messageData.exchange_id)
      .subscribe(value => {this.conver = value},error => {
        console.log(error)
        if(error.error['message']=='error'||error.error['message']=="You don't have access to this conversation."){
          localStorage.removeItem('conversation_ex_id')
          this.router.navigate(['app']).then()
        }});
  }

  sendMessage(id: number) {
    console.log(id);

    if (this.newMessageText.length > 0)
      this.message.sendMessage(id, this.newMessageText).subscribe(() => {
        this.newMessageText = '';
        this.getMessages(JSON.parse(localStorage.getItem('conversation_ex_id')))
        document.querySelector("#span-messaging").scrollIntoView();
        setTimeout(() => {
          document.querySelector("#span-messaging").scrollIntoView();
        }, 3000)

      });
  }

  accept(sationID: any, accToF: boolean) {
    this.message.aceeptEx(sationID, accToF).subscribe(value => {
      console.log(value)
      if(value['message']=='error'||value['message']=="You don't have access to this conversation."){
        localStorage.removeItem('conversation_ex_id')
      }
    })
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.getMessages(JSON.parse(localStorage.getItem('conversation_ex_id')))
    }, 5000);
  }
}
