import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateTargetPage } from './update-target.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateTargetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateTargetPageRoutingModule {}
