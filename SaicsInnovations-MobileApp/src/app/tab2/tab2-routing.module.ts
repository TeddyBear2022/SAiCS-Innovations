import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'checkout',
    loadChildren: () => import('../Client/Order/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('../Client/Order/address/address.module').then( m => m.AddressPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
