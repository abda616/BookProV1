import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
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


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MainPageComponent,
    TradeNowComponent,
    MyLibraryComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [MainPageService,],
  bootstrap: [AppComponent]
})
export class AppModule {
}
