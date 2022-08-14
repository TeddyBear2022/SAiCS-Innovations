import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSpecialPage } from './view-special.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSpecialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSpecialPageRoutingModule {}
