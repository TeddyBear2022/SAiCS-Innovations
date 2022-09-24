import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbassadorSpecialPage } from './ambassador-special.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorSpecialPage
  },  {
    path: 'ambassador-special-item',
    loadChildren: () => import('./ambassador-special-item/ambassador-special-item.module').then( m => m.AmbassadorSpecialItemPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadorSpecialPageRoutingModule {}
