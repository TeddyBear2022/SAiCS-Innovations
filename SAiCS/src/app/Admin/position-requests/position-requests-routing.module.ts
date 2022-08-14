import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PositionRequestsPage } from './position-requests.page';

const routes: Routes = [
  {
    path: '',
    component: PositionRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositionRequestsPageRoutingModule {}
