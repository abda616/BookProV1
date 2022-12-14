import {Observable} from "rxjs";
import {userSignup} from "./userSignup";

export interface SignUpSendData{
  sendDataUser(user:userSignup): Observable<userSignup>;
}
