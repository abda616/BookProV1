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
import {ChipMultiSelectComponent} from './chip-multi-select/chip-multi-select.component';
import {AuthInterceptor} from "./shared/Auth/authconfig.interceptor";
import {MyBookInfoComponent} from './book-info/book-info.component';
import {SharedDataModule} from "./shared/shared-data.module";
import {searchDataTransferService} from "./services/Transfer/search-data-transfer.service";
import {BookDataService} from "./services/Transfer/book-data.service";
import {SearchPageComponent} from './search-page/search-page.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatButtonModule} from '@angular/material/button';
import {ConversationComponent} from './conversation/conversation.component'
import {ToastrModule} from 'ngx-toastr';
import {MainService} from "./services/Main/main.service";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MainPageComponent,
    TradeNowComponent,
    MyLibraryComponent,
    LoginComponent,
    MyBookInfoComponent,
    ChipMultiSelectComponent,
    SearchPageComponent,
    UserProfileComponent,
    SpinnerComponent,
    ConversationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      autoDismiss: true,
      easeTime: 3,
      closeButton: true,
    })
  ],
  providers: [
    SharedDataModule,
    searchDataTransferService,
    BookDataService,
    MainService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},

  ], bootstrap: [AppComponent]
})
export class AppModule {
}
