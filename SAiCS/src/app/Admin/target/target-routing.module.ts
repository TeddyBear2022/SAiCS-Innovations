import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TargetPage } from './target.page';

const routes: Routes = [
  {
    path: '',
    component: TargetPage
  },
 
  {
    path: 'assign-target',
    loadChildren: () => import('./Modals/assign-target/assign-target.module').then( m => m.AssignTargetPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TargetPageRoutingModule {}
