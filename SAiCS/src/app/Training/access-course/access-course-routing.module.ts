import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessCoursePage } from './access-course.page';

const routes: Routes = [
  {
    path: '',
    component: AccessCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessCoursePageRoutingModule {}
