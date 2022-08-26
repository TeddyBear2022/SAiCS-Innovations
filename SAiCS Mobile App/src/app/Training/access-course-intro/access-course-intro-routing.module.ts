import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessCourseIntroPage } from './access-course-intro.page';

const routes: Routes = [
  {
    path: '',
    component: AccessCourseIntroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessCourseIntroPageRoutingModule {}
