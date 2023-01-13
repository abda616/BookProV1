import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) {
  }

  private messageId = new BehaviorSubject<any>(null);

  dataID = this.messageId.asObservable();

  setMessageID(x) {
    this.messageId.next(x);
    localStorage.setItem('conversation_ex_id', JSON.stringify(x));
  }

  getAllConversation(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}message/allConversations`);
  }

  getConversation(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}message/conversation?exchange_id=${id}`);
  }

  sendMessage(id: number, message: string) {
    return this.http.post<any>(`${environment.apiUrl}message/send`,
      {bookExchange_id: id, message: message})
  }

  aceeptEx(id: number, is: boolean) {
    return this.http.post<any>(`${environment.apiUrl}exchange/acceptExchange?exchange_id=${id}&accept=${is}`,null)
  }

}
