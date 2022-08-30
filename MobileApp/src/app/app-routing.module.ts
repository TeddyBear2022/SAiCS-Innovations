import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
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
    path: 'profile',
    loadChildren: () => import('./User/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'next',
    loadChildren: () => import('./User/next/next.module').then( m => m.NextPageModule)
  },
  {
    path: 'view-ambassador',
    loadChildren: () => import('./Client/view-ambassador/view-ambassador.module').then( m => m.ViewAmbassadorPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./Client/landing-page(client)/landing-page.module').then( m => m.LandingPagePageModule)
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
  {
    path: 'reset-password',
    loadChildren: () => import('./User/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule )
  },
  {
    path: 'feedback',
    loadChildren: () => import('./Client/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./User/profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
