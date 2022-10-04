import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YtVideoPage } from './yt-video.page';

const routes: Routes = [
  {
    path: '',
    component: YtVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YtVideoPageRoutingModule {}
