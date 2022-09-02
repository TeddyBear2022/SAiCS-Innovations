import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankingDetailsPage } from './banking-details.page';

const routes: Routes = [
  {
    path: '',
    component: BankingDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankingDetailsPageRoutingModule {}
