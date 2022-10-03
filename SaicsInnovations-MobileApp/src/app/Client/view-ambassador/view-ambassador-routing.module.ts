import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAmbassadorPage } from './view-ambassador.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAmbassadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAmbassadorPageRoutingModule {}
