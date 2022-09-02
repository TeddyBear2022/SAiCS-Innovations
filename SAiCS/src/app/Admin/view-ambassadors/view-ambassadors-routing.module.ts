import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAmbassadorsPage } from './view-ambassadors.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAmbassadorsPage
  },
  {
    path: 'ambassador-ranking-modal',
    loadChildren: () => import('./ambassador-ranking-modal/ambassador-ranking-modal.module').then( m => m.AmbassadorRankingModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAmbassadorsPageRoutingModule {}
