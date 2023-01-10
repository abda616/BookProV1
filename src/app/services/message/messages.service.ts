import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  private messageId = new BehaviorSubject<number>(0);
  private position = new BehaviorSubject<boolean>(true);
  dataID = this.messageId.asObservable();
  setMessageID(id:number){
    this.messageId.next(id);
    if (id !== 0) {
      localStorage.setItem('conversation',String(id));
    }
  }

  getAllConversation(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}message/allConversations`);
  }

  getConversation(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}message/conversation?exchange_id=${id}`);
  }

  sendMessage(id: number, message: string) {
    return this.http.post<any>(`${environment.apiUrl}message/send`,
      JSON.parse(`{"message":${message},"bookExchange_id":${id}}`))
  }

}
