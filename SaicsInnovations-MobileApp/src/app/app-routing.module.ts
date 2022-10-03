import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./User/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./User/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule )
  },
  {
    path: 'register',
    loadChildren: () => import('./User/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'next',
    loadChildren: () => import('./User/next/next.module').then( m => m.NextPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'checkout',
    loadChildren: () => import('./Client/Order/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./Client/Order/address/address.module').then( m => m.AddressPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./Client/Order/add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'item-details',
    loadChildren: () => import('./Client/item-details/item-details.module').then( m => m.ItemDetailsPageModule)
  },
  {
    path: 'special-item',
    loadChildren: () => import('./Client/special/special-item/special-item.module').then( m => m.SpecialItemPageModule)
  },
  {
    path: 'faq-details',
    loadChildren: () => import('./Client/faq/faq-details/faq-details.module').then( m => m.FaqDetailsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./User/about-us/about-us.module').then( m => m.AboutUsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
