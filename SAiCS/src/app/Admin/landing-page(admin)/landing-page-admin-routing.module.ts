import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageAdminPage } from './landing-page-admin.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPageAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageAdminPageRoutingModule {}
