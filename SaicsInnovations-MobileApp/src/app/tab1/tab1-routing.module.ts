import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'profile',
    loadChildren: () => import('../User/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('../Client/landing-page(client)/landing-page.module').then( m => m.LandingPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
