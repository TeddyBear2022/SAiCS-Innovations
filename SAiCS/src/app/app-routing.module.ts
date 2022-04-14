import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'faq',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./User/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./User/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./Client/landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./Client/faq/faq.module').then( m => m.FAQPageModule)
  },
  {
    path: 'account-faq',
    loadChildren: () => import('./Client/faq/account-faq/account-faq.module').then( m => m.AccountFaqPageModule )
  },
  {
    path: 'product-faq',
    loadChildren: () => import('./Client/faq/product-faq/product-faq.module').then( m => m.ProductFaqPageModule )
  },
  {
    path: 'delivery-faq',
    loadChildren: () => import('./Client/faq/delivery-faq/delivery-faq.module').then( m => m.DeliveryFaqPageModule )
  },
    
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
