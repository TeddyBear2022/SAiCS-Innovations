import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFaqDetailsPage } from './view-faq-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFaqDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFaqDetailsPageRoutingModule {}
