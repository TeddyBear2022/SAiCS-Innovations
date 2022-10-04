import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBankingDetailsPage } from './update-banking-details.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateBankingDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateBankingDetailsPageRoutingModule {}
