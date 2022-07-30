import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseStudioPage } from './course-studio.page';

const routes: Routes = [
  {
    path: '',
    component: CourseStudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseStudioPageRoutingModule {}
