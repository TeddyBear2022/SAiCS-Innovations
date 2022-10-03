import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqPage } from './faq.page';

const routes: Routes = [
  {
    path: '',
    component: FaqPage
  },
  {
    path: 'faq-details',
    loadChildren: () => import('./faq-details/faq-details.module').then( m => m.FaqDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqPageRoutingModule {}
