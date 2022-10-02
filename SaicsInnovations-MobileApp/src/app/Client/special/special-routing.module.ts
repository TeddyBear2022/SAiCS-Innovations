import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialPage } from './special.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialPage
  },
  {
    path: 'special-item',
    loadChildren: () => import('./special-item/special-item.module').then( m => m.SpecialItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialPageRoutingModule {}
