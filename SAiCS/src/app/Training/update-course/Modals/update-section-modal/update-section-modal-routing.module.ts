import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSectionModalPage } from './update-section-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSectionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSectionModalPageRoutingModule {}
