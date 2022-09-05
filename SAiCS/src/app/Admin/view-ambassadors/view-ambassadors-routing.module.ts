import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAmbassadorsPage } from './view-ambassadors.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAmbassadorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAmbassadorsPageRoutingModule {}
