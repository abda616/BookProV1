import {Injectable} from '@angular/core';
import {map, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {userSignIn, userSignUp} from "../Interfaces/userSignup";
import {environment} from "../../../environments/environment.prod";
import {ToastrService} from "ngx-toastr";
import {searchDataTransferService} from "../../services/Transfer/search-data-transfer.service";
import {MessagesService} from "../../services/message/messages.service";
import {BookDataService} from "../../services/Transfer/book-data.service";
import {SharedServiceService} from "../../services/shared-service.service";
import {MainService} from "../../services/Main/main.service";
import {ExchangeService} from "../../services/Exchange/exchange.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = environment.apiUrl;

  constructor(private http: HttpClient, public router: Router, public toast: ToastrService,
              public message: MessagesService, public main: MainService, public exchange: ExchangeService,
              public search: searchDataTransferService, public bookService: BookDataService,
              public shared: SharedServiceService) {
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

  setUserData1(x) {
    return this.http.put(`${this.endpoint}profile/editUser`, JSON.stringify(x), {headers: this.headers})
  }

  setUserData2UserName(x, y) {
    return this.http.put(`${this.endpoint}profile/editUser`, JSON.stringify({
      firstName: x,
      lastName: y
    }), {headers: this.headers})
  }

  setUserData2Password(x, y) {
    return this.http.put(`${this.endpoint}profile/editUser`, JSON.stringify({
      password: x,
      matchingPassword: y
    }), {headers: this.headers})
  }


// Sign-up
  signUp(user: userSignUp):
    Observable<any> {
    return this.http.post<any>(`${this.endpoint}register`, JSON.stringify(user), {headers: this.headers})
  }

// Sign-in
  signIn(user: userSignIn) {
    return this.http.post<any>(`${this.endpoint}api/v1/auth`, JSON.stringify(user), {headers: this.headers})
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn()
    :
    boolean {
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
  handleError(error: HttpErrorResponse
  ) {
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
