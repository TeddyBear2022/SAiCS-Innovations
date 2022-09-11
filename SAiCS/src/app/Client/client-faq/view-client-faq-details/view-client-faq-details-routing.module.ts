import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewClientFaqDetailsPage } from './view-client-faq-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewClientFaqDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewClientFaqDetailsPageRoutingModule {}
