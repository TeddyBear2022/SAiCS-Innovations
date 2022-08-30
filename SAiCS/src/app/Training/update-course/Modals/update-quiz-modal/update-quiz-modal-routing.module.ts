import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateQuizModalPage } from './update-quiz-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateQuizModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateQuizModalPageRoutingModule {}
