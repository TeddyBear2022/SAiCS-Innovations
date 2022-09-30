import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportAmbassadorsPage } from './import-ambassadors.page';

const routes: Routes = [
  {
    path: '',
    component: ImportAmbassadorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportAmbassadorsPageRoutingModule {}
