import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewClientsPage } from './view-clients.page';

const routes: Routes = [
  {
    path: '',
    component: ViewClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewClientsPageRoutingModule {}
