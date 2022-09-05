import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientSpecialPage } from './client-special.page';

const routes: Routes = [
  {
    path: '',
    component: ClientSpecialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSpecialPageRoutingModule {}
