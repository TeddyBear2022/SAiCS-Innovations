import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackPage } from './feedback.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackPage
  },
  {
    path: 'add-feedback',
    loadChildren: () => import('./add-feedback/add-feedback.module').then( m => m.AddFeedbackPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackPageRoutingModule {}
