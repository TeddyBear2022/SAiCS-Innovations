import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoRefferralCodePage } from './no-refferral-code.page';

const routes: Routes = [
  {
    path: '',
    component: NoRefferralCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoRefferralCodePageRoutingModule {}
