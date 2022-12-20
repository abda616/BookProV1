import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {MyBookInfoComponent} from './book-info/book-info.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {TradeNowComponent} from "./trade-now/trade-now.component";
import {MyLibraryComponent} from "./my-library/my-library.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./shared/Auth/auth.guard";
import {SearchBarComponent} from "./search-bar/search-bar.component";


const routes: Routes = [
  {path: '', redirectTo: '/log-in', pathMatch: 'full'},
  {path: 'log-in', component: LoginComponent},
  {
    path: 'app',
    component: LayoutComponent,
    /*canActivate: [AuthGuard],*/
    children: [
      {
        path: '',
        component: MainPageComponent,
        /*canActivate: [AuthGuard],*/
        pathMatch: "full"
      },
      {
        path: 'trade',
        component: TradeNowComponent,
        /*canActivate: [AuthGuard],*/
        pathMatch: "full"
      },
      {
        path: 'library',
        component: MyLibraryComponent,
        /*canActivate: [AuthGuard],*/
        pathMatch: "full"
      },
      {
        path: 'book',
        component: MyBookInfoComponent,
        /*canActivate: [AuthGuard],*/
        pathMatch: "full"
      },
      {
        path: 'search',
        component: SearchBarComponent,
        /*canActivate: [AuthGuard],*/
        pathMatch: "full"
      },
    ]
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    redirectTo: '/app'
  }
  // {path: '', component: },
  // {path: '', redirectTo: '/heroes-list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
