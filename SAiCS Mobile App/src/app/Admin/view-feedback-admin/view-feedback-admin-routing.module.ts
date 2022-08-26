import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFeedbackAdminPage } from './view-feedback-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFeedbackAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFeedbackAdminPageRoutingModule {}
