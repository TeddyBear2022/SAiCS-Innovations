import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbassadorSpecialPage } from './ambassador-special.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorSpecialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadorSpecialPageRoutingModule {}
