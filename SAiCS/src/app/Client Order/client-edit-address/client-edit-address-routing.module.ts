import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientEditAddressPage } from './client-edit-address.page';

const routes: Routes = [
  {
    path: '',
    component: ClientEditAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientEditAddressPageRoutingModule {}
