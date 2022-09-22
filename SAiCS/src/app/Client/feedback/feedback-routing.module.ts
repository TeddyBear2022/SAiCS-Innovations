import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuards/auth-guard.guard';

import { FeedbackPage } from './feedback.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackPage
  },
  {
    path: 'view-feedback',
    loadChildren: () => import('./view-feedback/view-feedback.module').then( m => m.ViewFeedbackPageModule),
    canLoad: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackPageRoutingModule {}
