import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientstabsPage } from './clientstabs.page';

const routes: Routes = [
  {
  
    path: 'clientTab',
    component: ClientstabsPage,
    children:[
      {
        path: 'landing-page',
        loadChildren: () => import('../Client/landing-page(client)/landing-page.module').then( m => m.LandingPagePageModule)
      }
    ]
  },
  {
    path: 'client',
    redirectTo: 'clientTab/landing-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientstabsPageRoutingModule {}
