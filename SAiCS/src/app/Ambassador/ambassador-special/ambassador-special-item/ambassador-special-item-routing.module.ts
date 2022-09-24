import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbassadorSpecialItemPage } from './ambassador-special-item.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorSpecialItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadorSpecialItemPageRoutingModule {}
