import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
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
    loadChildren: () => import('./Client/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'next',
    loadChildren: () => import('./User/next/next.module').then( m => m.NextPageModule)
  },
  {
    path: 'waiting',
    loadChildren: () => import('./User/waiting/waiting.module').then( m => m.WaitingPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./Client/landing-page(client)/landing-page.module').then( m => m.LandingPagePageModule)
  },
  {
    path: 'view-ambassador',
    loadChildren: () => import('./Client/view-ambassador/view-ambassador.module').then( m => m.ViewAmbassadorPageModule)
  },
  {
    path: 'landing-page-admin',
    loadChildren: () => import('./Admin/landing-page(admin)/landing-page-admin.module').then( m => m.LandingPageAdminPageModule)
  },
  // {
  //   path: 'view-faq',
  //   loadChildren: () => import('./Admin/faq(admin)/view-faq/view-faq.module').then( m => m.ViewFaqPageModule)
  // },
  {
    path: 'view-faq',
    loadChildren: () => import('./Admin/faq(admin)/view-faq.module').then( m => m.ViewFaqPageModule)
  },
  // {
  //   path: 'faq-add-modal',
  //   loadChildren: () => import('./Admin/modals/faq-add-modal/faq-add-modal.module').then( m => m.FAQAddModalPageModule)
  // },

  // {
  //   path: 'add-faq-modal',
  //   loadChildren: () => import('./Admin/modals/add-faq-modal/add-faq-modal.module').then( m => m.AddFAQModalPageModule)
  // },
  {
    path: 'view-product',
    loadChildren: () => import('./Product/view-product/view-product.module').then( m => m.ViewProductPageModule)
  },
  {
    path: 'view-package',
    loadChildren: () => import('./Product/view-package/view-package.module').then( m => m.ViewPackagePageModule)
  },

  // {
  //   path: 'add-faq',
  //   loadChildren: () => import('./Admin/modals/add-faq/add-faq.module').then( m => m.AddFaqPageModule)
  // },
    
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
