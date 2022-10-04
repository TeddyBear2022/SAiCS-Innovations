import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessCourseIntroPage } from './access-course-intro.page';

const routes: Routes = [
  {
    path: '',
    component: AccessCourseIntroPage
  },
  {
    path: 'yt-video',
    loadChildren: () => import('./yt-video/yt-video.module').then( m => m.YtVideoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessCourseIntroPageRoutingModule {}
