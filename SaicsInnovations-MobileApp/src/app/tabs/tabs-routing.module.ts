import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'special',
        loadChildren: () => import('../Client/special/special.module').then( m => m.SpecialPageModule)
      },
      {
        path: 'view-ambassador',
        loadChildren: () => import('../Client/view-ambassador/view-ambassador.module').then( m => m.ViewAmbassadorPageModule)
      },
      {
        path: 'feedback',
        loadChildren: () => import('../Client/feedback/feedback.module').then( m => m.FeedbackPageModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('../Client/faq/faq.module').then( m => m.FaqPageModule)
      },
      {
        path: 'order-history',
        loadChildren: () => import('../Client/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
