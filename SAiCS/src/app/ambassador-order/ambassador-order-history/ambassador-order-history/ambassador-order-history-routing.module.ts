import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbassadorOrderHistoryPage } from './ambassador-order-history.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorOrderHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadorOrderHistoryPageRoutingModule {}
