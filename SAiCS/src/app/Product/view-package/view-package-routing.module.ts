import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPackagePage } from './view-package.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPackagePageRoutingModule {}
