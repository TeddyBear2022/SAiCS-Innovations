import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientSpecialItemPage } from './client-special-item.page';

const routes: Routes = [
  {
    path: '',
    component: ClientSpecialItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSpecialItemPageRoutingModule {}
