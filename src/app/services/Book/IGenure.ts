import {Observable} from "rxjs";
import {Book} from "./Book";

export interface IGenure{
  response:Observable<Book>[];
}
