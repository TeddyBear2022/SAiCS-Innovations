import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialItemPage } from './special-item.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialItemPageRoutingModule {}
