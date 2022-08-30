import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignCoursePage } from './assign-course.page';

const routes: Routes = [
  {
    path: '',
    component: AssignCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignCoursePageRoutingModule {}
