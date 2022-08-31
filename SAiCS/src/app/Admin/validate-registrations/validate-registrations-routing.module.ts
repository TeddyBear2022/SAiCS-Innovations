import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateRegistrationsPage } from './validate-registrations.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateRegistrationsPage
  },
  {
    path: 'view-ambassador-info',
    loadChildren: () => import('./view-ambassador-info/view-ambassador-info.module').then( m => m.ViewAmbassadorInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidateRegistrationsPageRoutingModule {}
