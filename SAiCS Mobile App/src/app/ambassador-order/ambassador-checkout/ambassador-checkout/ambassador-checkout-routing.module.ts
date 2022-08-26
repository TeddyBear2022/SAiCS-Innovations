import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbassadorCheckoutPage } from './ambassador-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadorCheckoutPageRoutingModule {}
