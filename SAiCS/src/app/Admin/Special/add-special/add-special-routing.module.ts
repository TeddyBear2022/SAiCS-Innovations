import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSpecialPage } from './add-special.page';

const routes: Routes = [
  {
    path: '',
    component: AddSpecialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSpecialPageRoutingModule {}
