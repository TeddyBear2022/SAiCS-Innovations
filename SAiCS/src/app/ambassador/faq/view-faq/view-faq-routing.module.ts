import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFaqPage } from './view-faq.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFaqPageRoutingModule {}
