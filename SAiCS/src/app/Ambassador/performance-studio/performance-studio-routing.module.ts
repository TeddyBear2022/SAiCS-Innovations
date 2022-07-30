import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerformanceStudioPage } from './performance-studio.page';

const routes: Routes = [
  {
    path: '',
    component: PerformanceStudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformanceStudioPageRoutingModule {}
