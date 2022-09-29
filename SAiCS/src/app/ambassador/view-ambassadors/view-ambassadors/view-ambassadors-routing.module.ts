import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAmbassadorsPage } from './view-ambassadors.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAmbassadorsPage
  },
  {
    path: 'import-ambassadors',
    loadChildren: () => import('./import-ambassadors/import-ambassadors.module').then( m => m.ImportAmbassadorsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAmbassadorsPageRoutingModule {}
