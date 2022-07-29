import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbassadorCheckoutIiPage } from './ambassador-checkout-ii.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorCheckoutIiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadorCheckoutIiPageRoutingModule {}
