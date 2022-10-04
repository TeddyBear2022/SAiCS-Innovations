import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAmbassadorFeedbackPage } from './view-ambassador-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAmbassadorFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAmbassadorFeedbackPageRoutingModule {}
