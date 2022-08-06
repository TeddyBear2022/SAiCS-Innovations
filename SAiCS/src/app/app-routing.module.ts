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
    redirectTo: 'view-merch',
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
    path: 'view-merch',
    loadChildren: () => import('./Product/ViewMerch/ViewMerch.module').then( m => m.ViewProductPageModule)
  },
  {
    path: 'ambassador-landing-page',
    loadChildren: () => import('./Ambassador/landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },
  {
    path: 'performance-studio',
    loadChildren: () => import('./Ambassador/performance-studio/performance-studio.module').then( m => m.PerformanceStudioPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./Ambassador/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },


  {
    path: 'view-ambassador-faq',
    loadChildren: () => import('./ambassador/faq/view-faq/view-faq.module').then(m=>m.ViewFaqPageModule)
  },

  {
    path: 'view-ambassador-feedback',
    loadChildren: () => import('./ambassador/view-ambassador-feedback/view-ambassador-feedback/view-ambassador-feedback.module').then( m => m.ViewAmbassadorFeedbackPageModule)
  },

  {
    path: 'view-ambassadors',
    loadChildren: () => import('./ambassador/view-ambassadors/view-ambassadors/view-ambassadors.module').then( m => m.ViewAmbassadorsPageModule)
  },

  {
    path: 'view-clients',
    loadChildren: () => import('./ambassador/view-clients/view-clients/view-clients.module').then( m => m.ViewClientsPageModule)
  },

  {
    path: 'view-order-details',
    loadChildren: () => import('./ambassador/view-order-details/view-order-details/view-order-details.module').then( m => m.ViewOrderDetailsPageModule)
  },

  {
    path: 'view-orders',
    loadChildren: () => import('./ambassador/view-orders/view-orders/view-orders.module').then( m => m.ViewOrdersPageModule)
  },

  {
    path: 'ambassador-checkout',
    loadChildren: () => import('./ambassador-order/ambassador-checkout/ambassador-checkout/ambassador-checkout.module').then( m => m.AmbassadorCheckoutPageModule)
  },

  {
    path: 'ambassador-checkout-ii',
    loadChildren: () => import('./ambassador-order/ambassador-checkout-ii/ambassador-checkout-ii/ambassador-checkout-ii.module').then( m => m.AmbassadorCheckoutIiPageModule)
  },

  {
    path: 'ambassador-order-history',
    loadChildren: () => import('./ambassador-order/ambassador-order-history/ambassador-order-history/ambassador-order-history.module').then( m => m.AmbassadorOrderHistoryPageModule)
  },
 
  {
    path: 'orders-faq',
    loadChildren: () => import('./ambassador/faq/orders-faq/orders-faq.module').then( m => m.OrdersFaqPageModule)
  },
  {
    path: 'agents-faq',
    loadChildren: () => import('./ambassador/faq/agents-faq/agents-faq.module').then( m => m.AgentsFaqPageModule)
  },
  {
    path: 'rankings-faq',
    loadChildren: () => import('./ambassador/faq/rankings-faq/rankings-faq.module').then( m => m.RankingsFaqPageModule)
  },
  {
    path: 'view-ambassador-cart',
    loadChildren: () => import('./ambassador-order/view-ambassador-cart/view-ambassador-cart.module').then( m => m.ViewAmbassadorCartPageModule)
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
