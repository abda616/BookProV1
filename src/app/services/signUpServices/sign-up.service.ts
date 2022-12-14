import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SignUpSendData} from "./signUpSendData";
import {userSignup} from "./userSignup";
import {environment} from "../../../environments/environment.prod";
import {catchError, Observable, throwError} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SignUpService implements SignUpSendData{

  constructor(private http: HttpClient) { }

  sendDataUser(user: userSignup): Observable<userSignup> {
    return this.http.post<userSignup>( environment.registerUrl ,user).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    }else if (error.status === 500){
      console.error('An error occurred: user already exist ', error.error);
      alert("user already exist")
    } else if (error.status === 200){
      console.log('Sent', error.error);
    } else if (error.status === 201){
      console.log('saved', error.error);
    }else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
