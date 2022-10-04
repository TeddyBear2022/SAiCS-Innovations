import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientOrderhistoryPage } from './client-orderhistory.page';

const routes: Routes = [
  {
    path: '',
    component: ClientOrderhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientOrderhistoryPageRoutingModule {}
