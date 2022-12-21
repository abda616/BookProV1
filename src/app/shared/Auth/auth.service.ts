import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {userSignIn, userSignup} from "../Interfaces/userSignup";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = environment.endPointUrl;

  constructor(private http: HttpClient, public router: Router) {
  }

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  // Sign-up
  signUp(user: userSignup): Observable<any> {
    return this.http.post(`${this.endpoint}/register`, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: userSignIn) {
    return this.http.post<any>(`${this.endpoint}/signIn`, user).pipe(catchError(this.handleError));
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  doLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_Email');
    localStorage.removeItem('user_Id');
    this.router.navigate(['log-in']);
  }

  // User profile
  /*getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user/${id}`;
    return this.http.get(api, {headers: this.headers}).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }*/

  // Error
  handleError(error: HttpErrorResponse) {
    let msg:string;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
