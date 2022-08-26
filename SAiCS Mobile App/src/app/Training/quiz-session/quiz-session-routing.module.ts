import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizSessionPage } from './quiz-session.page';

const routes: Routes = [
  {
    path: '',
    component: QuizSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizSessionPageRoutingModule {}
