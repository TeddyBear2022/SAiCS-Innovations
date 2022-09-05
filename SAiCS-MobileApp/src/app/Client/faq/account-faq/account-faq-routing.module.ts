import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountFaqPage } from './account-faq.page';

const routes: Routes = [
  {
    path: '',
    component: AccountFaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountFaqPageRoutingModule {}
