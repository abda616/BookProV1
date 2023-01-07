import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {LoadingService} from "../../services/loading.service";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private loader: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();
    const authToken = this.authService.getToken();
    req = (authToken === null || authToken === undefined) ? req : req.clone(
      {
        setHeaders: {Authorization: `Bearer ${authToken}`}
      }
    );
    return next.handle(req).pipe(
      finalize(() => {
        this.loader.hide();
      })
    )
  }
}
