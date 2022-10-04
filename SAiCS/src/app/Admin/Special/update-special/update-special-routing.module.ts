import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSpecialPage } from './update-special.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSpecialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSpecialPageRoutingModule {}
