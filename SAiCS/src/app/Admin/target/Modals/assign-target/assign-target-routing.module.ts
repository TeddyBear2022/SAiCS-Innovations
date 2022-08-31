import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignTargetPage } from './assign-target.page';

const routes: Routes = [
  {
    path: '',
    component: AssignTargetPage
  },
  {
    path: 'update-target',
    loadChildren: () => import('../update-target/update-target.module').then( m => m.UpdateTargetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignTargetPageRoutingModule {}
