import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateQuizPage } from './update-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateQuizPageRoutingModule {}
