import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientCheckoutPage } from './client-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: ClientCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientCheckoutPageRoutingModule {}
