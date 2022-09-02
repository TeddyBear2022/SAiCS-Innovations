import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbassadorRankingModalPage } from './ambassador-ranking-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorRankingModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadorRankingModalPageRoutingModule {}
