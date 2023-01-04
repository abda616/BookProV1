import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {userSignIn, userSignUp} from "../Interfaces/userSignup";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = environment.apiUrl;
  constructor(private http: HttpClient, public router: Router) {
  }

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  //currentUser = {};

  // Sign-up
  signUp(user: userSignUp): Observable<any> {
    return this.http.post<any>(`${this.endpoint}register`, JSON.stringify(user), {headers: this.headers})
      .pipe(catchError (this.handleError));
  }

  // Sign-in
  signIn(user: userSignIn) {
    return this.http.post<any>(`${this.endpoint}api/v1/auth`, JSON.stringify(user), {headers: this.headers})
      .pipe(catchError(this.handleError)
      );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  doLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['log-in']).then(()=> {});
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
    let msg: string;
    if (error.status!=200) {
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Code: ${error.status}\tMessage type: ${error.message}`;
        let errorMsg = `${error.error.message}`
        let ch = (errorMsg != undefined||errorMsg != null);
        if (ch) {
          alert(errorMsg)
        }
      }
      return throwError(msg);
    }
    return throwError(error.message);
  }
}
