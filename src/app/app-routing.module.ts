import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

import {MainPageComponent} from "./main-page/main-page.component";
import {TradeNowComponent} from "./trade-now/trade-now.component";
import {MyLibraryComponent} from "./my-library/my-library.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'logs',
    component: LayoutComponent,
    children: [
      {
        path: 'm',
        component: MainPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'tradeNowPage',
        component: TradeNowComponent,
        pathMatch: 'full'
      },
      {
        path: 'myLibraryPage',
        component: MyLibraryComponent,
        pathMatch: 'full'
      },
    ]
  }

  /*
  ,{
    path: '**',
    component: LayoutComponent
  }
  */
  // {path: '', component: },
  // {path: '', redirectTo: '/heroes-list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
