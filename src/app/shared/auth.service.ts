import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {Router} from '@angular/router';
import {userSignIn, userSignup} from "../services/signUpServices/userSignup";
import {environment} from "../../environments/environment.prod";

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
    let e = this.http.post(`${this.endpoint}/register`, user).pipe(catchError(this.handleError));
    console.log(e);
    return e;
  }

  // Sign-in
  signIn(user: userSignIn) {
    return this.http.post<any>(`${this.endpoint}/signIn`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('userEmail', res.email);
        localStorage.setItem('userId', res.id);
        this.router.navigate(['app']);
        /*this.getUserProfile(res.id).subscribe((res) => {
          this.currentUser = res;
        });*/
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
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
    let msg = '';
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
