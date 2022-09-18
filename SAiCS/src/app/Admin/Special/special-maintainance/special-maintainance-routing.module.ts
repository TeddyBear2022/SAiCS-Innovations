import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialMaintainancePage } from './special-maintainance.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialMaintainancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialMaintainancePageRoutingModule {}
