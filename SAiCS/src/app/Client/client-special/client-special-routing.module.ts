import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientSpecialPage } from './client-special.page';

const routes: Routes = [
  {
    path: '',
    component: ClientSpecialPage
  },  {
    path: 'client-special-item',
    loadChildren: () => import('./client-special-item/client-special-item.module').then( m => m.ClientSpecialItemPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSpecialPageRoutingModule {}
