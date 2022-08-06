import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMerchPage } from './ViewMerch.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMerchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProductPageRoutingModule {}
