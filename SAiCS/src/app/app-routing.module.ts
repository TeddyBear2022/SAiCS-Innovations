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
      path: 'view-ambassador',
      loadChildren: () => import('./Client/view-ambassador/view-ambassador.module').then( m => m.ViewAmbassadorPageModule)
    },
    {
      path: 'landing-page-admin',
      loadChildren: () => import('./Admin/landing-page(admin)/landing-page-admin.module').then( m => m.LandingPageAdminPageModule)
    },
    {
      path: 'view-faq',
      loadChildren: () => import('./Admin/faq(admin)/view-faq.module').then( m => m.ViewFaqPageModule)
    },
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
    {path: 'new-course',
      loadChildren: () => import('./Training/new-course/new-course.module').then( m => m.NewCoursePageModule)
    },
    {
    path: 'client-checkout',
    loadChildren: () => import('./Client Order/client-checkout/client-checkout.module').then( m => m.ClientCheckoutPageModule)
    },

  {
    path: 'landing-page',
    loadChildren: () => import('./Client/landing-page(client)/landing-page.module').then( m => m.LandingPagePageModule)
  },
    
  {
    path: 'clients-cart',
    loadChildren: () => import('./Client Order/clients-cart/clients-cart.module').then( m => m.ClientsCartPageModule)},
    
  {
    path: 'add-address',
  loadChildren: () => import('./Client Order/add-address/add-address.module').then( m => m.AddAddressPageModule)},
    {
      path: 'quiz-session',
      loadChildren: () => import('./Training/quiz-session/quiz-session.module').then( m => m.QuizSessionPageModule)
    },

    {
      path: 'access-course',
      loadChildren: () => import('./Training/access-course/access-course.module').then( m => m.AccessCoursePageModule)
    },

    {
      path: 'begin-course',
      loadChildren: () => import('./Training/begin-course/begin-course.module').then( m => m.BeginCoursePageModule)
    },

    // {
    //   path: 'add-faq',
    //   loadChildren: () => import('./Admin/modals/add-faq/add-faq.module').then( m => m.AddFaqPageModule)
    // },
      
    {
      path: 'access-course-intro',
      loadChildren: () => import('./Training/access-course-intro/access-course-intro.module').then( m => m.AccessCourseIntroPageModule)
    },
    {
      path: 'start-quiz',
      loadChildren: () => import('./Training/start-quiz/start-quiz.module').then( m => m.StartQuizPageModule)
    },

    {
      path: 'item-details',
      loadChildren: () => import('./Client Order/item-details/item-details.module').then( m => m.ItemDetailsPageModule)
    },
    {
      path: 'assign-course',
      loadChildren: () => import('./Training/assign-course/assign-course.module').then( m => m.AssignCoursePageModule)
    },

    {
      path: 'add-address',
      loadChildren: () => import('./Client Order/add-address/add-address.module').then( m => m.AddAddressPageModule)
    },
  {
    path: 'navbar-menu',
    loadChildren: () => import('./navbar-menu/navbar-menu.module').then( m => m.NavbarMenuPageModule)
  },
  {
    path: 'position-requests',
    loadChildren: () => import('./Admin/position-requests/position-requests.module').then( m => m.PositionRequestsPageModule)
  },
  {
    path: 'target',
    loadChildren: () => import('./Admin/target/target.module').then( m => m.TargetPageModule)
  },
  {
    path: 'update-course',
    loadChildren: () => import('./Training/update-course/update-course.module').then( m => m.UpdateCoursePageModule)
  },
  {
    path: 'course-studio',
    loadChildren: () => import('./Training/course-studio/course-studio.module').then( m => m.CourseStudioPageModule)
  },
  {
    path: 'update-quiz',
    loadChildren: () => import('./Training/update-quiz/update-quiz.module').then( m => m.UpdateQuizPageModule)
  },


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
