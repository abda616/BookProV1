import {Injectable} from '@angular/core';
import {map, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {userSignIn, userSignUp} from "../Interfaces/userSignup";
import {environment} from "../../../environments/environment.prod";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = environment.apiUrl;

  constructor(private http: HttpClient, public router: Router, public toast: ToastrService) {
  }

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  //User profile
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.endpoint}profile/user`)
      .pipe(
        map((res) => {
          this.currentUser = res
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  getUserData() {
    return this.http.get(`${this.endpoint}profile/user`)
  }

  setUserData(x) {
    return this.http.post(`${this.endpoint}profile/editUser`, JSON.stringify(x))
  }

  getUserPic() {
    let x = JSON.parse(localStorage.getItem("userData")).profileImageUrl;
    if (x)
      return x;
    else {
      return '';
    }
  }

  getUserName() {
    return `${JSON.parse(localStorage.getItem("userData")).firstName} ${JSON.parse(localStorage.getItem("userData")).lastName}`;
  }

  setUserPic(x) {
    return this.http.post(`${this.endpoint}profile/editUser`, JSON.stringify(x))
  }

  setUserInterest(x) {
    return this.http.post(`${this.endpoint}profile/editUser`, JSON.stringify(x))
  }


  // Sign-up
  signUp(user: userSignUp): Observable<any> {
    return this.http.post<any>(`${this.endpoint}register`, JSON.stringify(user), {headers: this.headers})
  }

  // Sign-in
  signIn(user: userSignIn) {
    return this.http.post<any>(`${this.endpoint}api/v1/auth`, JSON.stringify(user), {headers: this.headers})
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  doLogout() {
    localStorage.clear();
    this.router.navigate(['log-in']).then(() => {
    });
    this.toast.success("Logged Out Successfully ", 'Good Bye');
    localStorage.clear();
  }

  /*getRefreshToken() {
      return localStorage.getItem('refresh_token');
    }*/

  /*refreshToken() {
    return this.http.get(`${this.endpoint}api/v1/refreshToken`, {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${this.getRefreshToken()}`)
        .append('Content-Type', 'application/json')
    })
  }*/

  // Error
  handleError(error: HttpErrorResponse) {
    let msg: string;
    this.toast.error(error.error.message)
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
