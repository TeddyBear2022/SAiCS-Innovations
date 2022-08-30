import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeginCoursePage } from './begin-course.page';

const routes: Routes = [
  {
    path: '',
    component: BeginCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeginCoursePageRoutingModule {}
