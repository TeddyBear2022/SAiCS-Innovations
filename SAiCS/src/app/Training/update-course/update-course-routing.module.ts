import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCoursePage } from './update-course.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCoursePage
  },
  {
    path: 'update-section-modal',
    loadChildren: () => import('./Modals/update-section-modal/update-section-modal.module').then( m => m.UpdateSectionModalPageModule)
  },
  {
    path: 'update-quiz-modal',
    loadChildren: () => import('./Modals/update-quiz-modal/update-quiz-modal.module').then( m => m.UpdateQuizModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCoursePageRoutingModule {}
