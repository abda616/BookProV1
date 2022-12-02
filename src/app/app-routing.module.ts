import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

import {MainPageComponent} from "./main-page/main-page.component";
import {TradeNowComponent} from "./trade-now/trade-now.component";
import {MyLibraryComponent} from "./my-library/my-library.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
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
      {
        path: '**',
        component: MainPageComponent,
      },
    ]
  },
  {
    path: '**',
    component: LayoutComponent
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
