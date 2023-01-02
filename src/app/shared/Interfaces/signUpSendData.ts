import {Observable} from "rxjs";
import {userSignup} from "./userSignup";

export interface SignUpSendData {
  MsignUp(user: userSignup): Observable<userSignup>;
}
