import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children:[
      {
        path: 'special',
        loadChildren: () => import('../Client/special/special.module').then( m => m.SpecialPageModule)
      },
      {
        path: 'view-ambassador',
        loadChildren: () => import('./view-ambassador/view-ambassador.module').then( m => m.ViewAmbassadorPageModule)
      }
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
