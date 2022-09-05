import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingsFaqPage } from './rankings-faq.page';

const routes: Routes = [
  {
    path: '',
    component: RankingsFaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingsFaqPageRoutingModule {}
