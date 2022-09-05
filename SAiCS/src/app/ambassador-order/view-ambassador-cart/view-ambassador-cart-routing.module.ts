import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAmbassadorCartPage } from './view-ambassador-cart.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAmbassadorCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAmbassadorCartPageRoutingModule {}
