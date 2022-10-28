import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAmbassadorPage } from './my-ambassador.page';

const routes: Routes = [
  {
    path: '',
    component: MyAmbassadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAmbassadorPageRoutingModule {}
