import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FAQPage } from './faq.page';

const routes: Routes = [
  {
    path: '',
    component: FAQPage
  },
  {
    path: 'account-faq',
    loadChildren: () => import('../../Client/faq/account-faq/account-faq.module').then( m => m.AccountFaqPageModule)
  },
  {
    path: 'product-faq',
    loadChildren: () => import('../../Client/faq/product-faq/product-faq.module').then( m => m.ProductFaqPageModule)
  },
  {
    path: 'delivery-faq',
    loadChildren: () => import('../../Client/faq/delivery-faq/delivery-faq.module').then( m => m.DeliveryFaqPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FAQPageRoutingModule {}
