import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignTargetPage } from './assign-target.page';

const routes: Routes = [
  {
    path: '',
    component: AssignTargetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignTargetPageRoutingModule {}
