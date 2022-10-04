import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchMaintenancePage } from './merch-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: MerchMaintenancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchMaintenancePageRoutingModule {}
