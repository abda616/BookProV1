import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {MyBookInfoComponent} from './book-info/book-info.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {TradeNowComponent} from "./trade-now/trade-now.component";
import {MyLibraryComponent} from "./my-library/my-library.component";
import {LoginComponent} from "./login/login.component";
import { SearchPageComponent } from './search-page/search-page.component';
import {AuthGuard} from "./shared/Auth/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/log-in', pathMatch: 'full'},
  {path: 'log-in', component: LoginComponent},
  {
    path: 'app',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MainPageComponent,
        // canActivate: [AuthGuard],
        pathMatch: "full"
      },
      {
        path: 'trade',
        component: TradeNowComponent,
        // canActivate: [AuthGuard],
        pathMatch: "full"
      },
      {
        path: 'library',
        component: MyLibraryComponent,
        // canActivate: [AuthGuard],
        pathMatch: "full"
      },
      {
        path: 'book',
        component: MyBookInfoComponent,
        pathMatch: "full"
      },
      {
        path: 'search',
        component:SearchPageComponent,
        pathMatch:"full"
      },
    ]
  },
  {
    path: '**', redirectTo: '/app'
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
