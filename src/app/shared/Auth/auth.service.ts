import {Injectable} from '@angular/core';
import {map, Observable, throwError} from 'rxjs';
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

  constructor(private http: HttpClient, private router: Router) {
  }

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  // Sign-up
  signUp(user: userSignUp): Observable<any> {
    return this.http.post<any>(`${this.endpoint}register`, JSON.stringify(user), {headers: this.headers})
      .pipe(catchError(this.handleError));
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
    localStorage.removeItem('interests');
    this.router.navigate(['log-in']).then(() => {
    });
  }

  refreshToken() {
    return this.http.get(`${this.endpoint}api/v1/refreshToken`, {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${this.getRefreshToken()}`)
        .append('Content-Type', 'application/json')
    })
  }

  //User profile
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.endpoint}profile/user`, {headers: this.headers})
      .pipe(
        map((res) => {
          this.currentUser = res
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg: string;
    if (error.status != 200) {
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Code: ${error.status}\tMessage type: ${error.message}`;
        let errorMsg = `${error.error.message}`
        if (errorMsg) {
          alert(errorMsg)
        }
      }
      return throwError(() => {
        return msg;
      });
    }
    return throwError(() => {
      return error.message;
    });
  }
}
