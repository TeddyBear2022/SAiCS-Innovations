import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  },
  {
    path: 'banking-details',
    loadChildren: () => import('./banking-details/banking-details.module').then( m => m.BankingDetailsPageModule)
  },
  {
    path: 'no-refferral-code',
    loadChildren: () => import('./modals/no-refferral-code/no-refferral-code.module').then( m => m.NoRefferralCodePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
