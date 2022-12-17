import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {LoginComponent} from './login/login.component';
import {TradeNowComponent} from './trade-now/trade-now.component';
import {MyLibraryComponent} from './my-library/my-library.component';
import {MainPageService} from "./services/main-page.service";
import {ChipMultiSelectComponent} from './chip-multi-select/chip-multi-select.component';
import {SignUpService} from "./services/signUpServices/sign-up.service";
import {AuthInterceptor} from "./shared/authconfig.interceptor";
import { MyBookInfoComponent} from './book-info/book-info.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MainPageComponent,
    TradeNowComponent,
    MyLibraryComponent,
    LoginComponent,
    MyBookInfoComponent,
    SearchBarComponent,
    ChipMultiSelectComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,

  ],
  providers: [MainPageService,SignUpService , {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
