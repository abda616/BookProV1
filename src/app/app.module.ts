import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LayoutComponent} from './layout/layout.component';
import {SharedModule} from "./shared/shared.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule} from "@angular/forms";
import {MainPageComponent} from './main-page/main-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TradeNowComponent} from './trade-now/trade-now.component';
import {MyLibraryComponent} from './my-library/my-library.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    LayoutComponent,
    MainPageComponent,
    PageNotFoundComponent,
    TradeNowComponent,
    MyLibraryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    BrowserAnimationsModule,

    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
