import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewClientFaqPage } from './view-client-faq.page';

const routes: Routes = [
  {
    path: '',
    component: ViewClientFaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewClientFaqPageRoutingModule {}
