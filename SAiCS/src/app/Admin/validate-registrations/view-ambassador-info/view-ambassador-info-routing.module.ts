import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAmbassadorInfoPage } from './view-ambassador-info.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAmbassadorInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAmbassadorInfoPageRoutingModule {}
