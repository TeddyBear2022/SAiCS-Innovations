  import { NgModule } from '@angular/core';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './AuthGuards/admin-guard.guard';
import { AmbassadorAuthGuard } from './AuthGuards/ambassador-guard.guard';
import { AuthGuard } from './AuthGuards/auth-guard.guard';
import { ClientAuthGuard } from './AuthGuards/client-guard.guard';

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
      loadChildren: () => import('./Client/landing-page(client)/landing-page.module').then( m => m.LandingPagePageModule),
      canLoad: [ClientAuthGuard]
    },
    {
      path: 'faq',
      loadChildren: () => import('./Client/faq/faq.module').then( m => m.FAQPageModule),
      canLoad: [ClientAuthGuard]
    },
    {
      path: 'account-faq',
      loadChildren: () => import('./Client/faq/account-faq/account-faq.module').then( m => m.AccountFaqPageModule ),
      canLoad: [ClientAuthGuard]
    },
    {
      path: 'product-faq',
      loadChildren: () => import('./Client/faq/product-faq/product-faq.module').then( m => m.ProductFaqPageModule ),
      canLoad: [ClientAuthGuard]
    },
    {
      path: 'delivery-faq',
      loadChildren: () => import('./Client/faq/delivery-faq/delivery-faq.module').then( m => m.DeliveryFaqPageModule ),
      canLoad: [ClientAuthGuard]
    },
    {
      path: 'reset-password',
      loadChildren: () => import('./User/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule )
    },
    {
      path: 'feedback',
      loadChildren: () => import('./Client/feedback/feedback.module').then( m => m.FeedbackPageModule),
      canLoad: [ClientAuthGuard]
    },
    {
      path: 'profile',
      loadChildren: () => import('./User/profile/profile.module').then( m => m.ProfilePageModule),
      canLoad: [AuthGuard]
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
      loadChildren: () => import('./Client/view-ambassador/view-ambassador.module').then( m => m.ViewAmbassadorPageModule),
      canLoad: [ClientAuthGuard]
    },
    {
      path: 'landing-page-admin',
      loadChildren: () => import('./Admin/landing-page(admin)/landing-page-admin.module').then( m => m.LandingPageAdminPageModule),
      canLoad: [AdminAuthGuard]
    },
    {
      path: 'view-faq',
      loadChildren: () => import('./Admin/faq(admin)/view-faq.module').then( m => m.ViewFaqPageModule),
      canLoad: [AdminAuthGuard]
    },
    {
      path: 'view-faq',
      loadChildren: () => import('./Admin/faq(admin)/view-faq.module').then( m => m.ViewFaqPageModule),
      canLoad: [AdminAuthGuard]
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
    loadChildren: () => import('./Product/ViewMerch/ViewMerch.module').then( m => m.ViewProductPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'ambassador-landing-page',
    loadChildren: () => import('./Ambassador/landing-page/landing-page.module').then( m => m.LandingPagePageModule),
    canLoad: [AmbassadorAuthGuard]
  },
  {
    path: 'performance-studio',
    loadChildren: () => import('./Ambassador/performance-studio/performance-studio.module').then( m => m.PerformanceStudioPageModule),
    canLoad: [AmbassadorAuthGuard]
  },
  {
    path: 'product-details',
    loadChildren: () => import('./Ambassador/product-details/product-details.module').then( m => m.ProductDetailsPageModule),
    canLoad: [AmbassadorAuthGuard]
  },
    {
      path: 'view-ambassador-faq',
      loadChildren: () => import('./ambassador/faq/view-faq/view-faq.module').then(m=>m.ViewFaqPageModule),
      canLoad: [AmbassadorAuthGuard]
    },
    {
      path: 'view-ambassador-feedback',
      loadChildren: () => import('./ambassador/view-ambassador-feedback/view-ambassador-feedback/view-ambassador-feedback.module').then( m => m.ViewAmbassadorFeedbackPageModule),
      canLoad: [AmbassadorAuthGuard]
    },

    {
      path: 'view-ambassadors',
      loadChildren: () => import('./ambassador/view-ambassadors/view-ambassadors/view-ambassadors.module').then( m => m.ViewAmbassadorsPageModule),
      canLoad: [AmbassadorAuthGuard]
    },

    {
      path: 'view-clients',
      loadChildren: () => import('./ambassador/view-clients/view-clients/view-clients.module').then( m => m.ViewClientsPageModule),
      canLoad: [AmbassadorAuthGuard]
    },

    {
      path: 'view-order-details',
      loadChildren: () => import('./ambassador/view-order-details/view-order-details/view-order-details.module').then( m => m.ViewOrderDetailsPageModule),
      canLoad: [AmbassadorAuthGuard]
    },

    {
      path: 'view-orders',
      loadChildren: () => import('./ambassador/view-orders/view-orders/view-orders.module').then( m => m.ViewOrdersPageModule),
      canLoad: [AmbassadorAuthGuard]
    },

    {
      path: 'ambassador-checkout',
      loadChildren: () => import('./ambassador-order/ambassador-checkout/ambassador-checkout/ambassador-checkout.module').then( m => m.AmbassadorCheckoutPageModule),
      canLoad: [AmbassadorAuthGuard]
    },

    {
      path: 'ambassador-checkout-ii',
      loadChildren: () => import('./ambassador-order/ambassador-checkout-ii/ambassador-checkout-ii/ambassador-checkout-ii.module').then( m => m.AmbassadorCheckoutIiPageModule),
      canLoad: [AmbassadorAuthGuard]
    },

    {
      path: 'ambassador-order-history',
      loadChildren: () => import('./ambassador-order/ambassador-order-history/ambassador-order-history/ambassador-order-history.module').then( m => m.AmbassadorOrderHistoryPageModule),
      canLoad: [AmbassadorAuthGuard]
    },
  
    {
      path: 'orders-faq',
      loadChildren: () => import('./ambassador/faq/orders-faq/orders-faq.module').then( m => m.OrdersFaqPageModule),
      canLoad: [AmbassadorAuthGuard]
    },
    {
      path: 'agents-faq',
      loadChildren: () => import('./ambassador/faq/agents-faq/agents-faq.module').then( m => m.AgentsFaqPageModule),
      canLoad: [AmbassadorAuthGuard]
    },
    {
      path: 'rankings-faq',
      loadChildren: () => import('./ambassador/faq/rankings-faq/rankings-faq.module').then( m => m.RankingsFaqPageModule),
      canLoad: [AmbassadorAuthGuard]
    },
    {
      path: 'view-ambassador-cart',
      loadChildren: () => import('./ambassador-order/view-ambassador-cart/view-ambassador-cart.module').then( m => m.ViewAmbassadorCartPageModule),
      canLoad: [AmbassadorAuthGuard]
      
    },
    {path: 'new-course',
      loadChildren: () => import('./Training/new-course/new-course.module').then( m => m.NewCoursePageModule),
      canLoad: [AdminAuthGuard]
    },
    {
    path: 'client-checkout',
    loadChildren: () => import('./Client Order/client-checkout/client-checkout.module').then( m => m.ClientCheckoutPageModule),
    canLoad: [ClientAuthGuard]
    },
  {
    path: 'view-special',
    loadChildren: () => import('./Admin/Special/view-special/view-special.module').then( m => m.ViewSpecialPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'add-special',
    loadChildren: () => import('./Admin/Special/add-special/add-special.module').then( m => m.AddSpecialPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'update-special',
    loadChildren: () => import('./Admin/Special/update-special/update-special.module').then( m => m.UpdateSpecialPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'report',
    loadChildren: () => import('./Report/report/report.module').then( m => m.ReportPageModule),
    canLoad: [AdminAuthGuard]
  },

  {
    path: 'landing-page',
    loadChildren: () => import('./Client/landing-page(client)/landing-page.module').then( m => m.LandingPagePageModule),
    canLoad: [ClientAuthGuard]
  },
    
  {
    path: 'clients-cart',
    loadChildren: () => import('./Client Order/clients-cart/clients-cart.module').then( m => m.ClientsCartPageModule),
    canLoad: [ClientAuthGuard]},
    
  {
    path: 'add-address',
    loadChildren: () => import('./Client Order/add-address/add-address.module').then( m => m.AddAddressPageModule),
    canLoad: [ClientAuthGuard]},
    {
      path: 'quiz-session',
      loadChildren: () => import('./Training/quiz-session/quiz-session.module').then( m => m.QuizSessionPageModule),
      canLoad: [ClientAuthGuard]
    },

    {
      path: 'access-course',
      loadChildren: () => import('./Training/access-course/access-course.module').then( m => m.AccessCoursePageModule),
      canLoad: [AmbassadorAuthGuard]
    },

    {
      path: 'begin-course',
      loadChildren: () => import('./Training/begin-course/begin-course.module').then( m => m.BeginCoursePageModule),
      canLoad: [AmbassadorAuthGuard]
    },

    // {
    //   path: 'add-faq',
    //   loadChildren: () => import('./Admin/modals/add-faq/add-faq.module').then( m => m.AddFaqPageModule)
    // },
      
    {
      path: 'access-course-intro',
      loadChildren: () => import('./Training/access-course-intro/access-course-intro.module').then( m => m.AccessCourseIntroPageModule),
      canLoad: [AmbassadorAuthGuard]
    },
    {
      path: 'start-quiz',
      loadChildren: () => import('./Training/start-quiz/start-quiz.module').then( m => m.StartQuizPageModule),
      canLoad: [AmbassadorAuthGuard]
    },

    {
      path: 'item-details',
      loadChildren: () => import('./Client Order/item-details/item-details.module').then( m => m.ItemDetailsPageModule),
      canLoad: [ClientAuthGuard]
    },
    {
      path: 'assign-course',
      loadChildren: () => import('./Training/assign-course/assign-course.module').then( m => m.AssignCoursePageModule),
      canLoad: [AdminAuthGuard]
    },

    {
      path: 'add-address',
      loadChildren: () => import('./Client Order/add-address/add-address.module').then( m => m.AddAddressPageModule),
      canLoad: [AmbassadorAuthGuard]
    },
  {
    path: 'navbar-menu',
    loadChildren: () => import('./navbar-menu/navbar-menu.module').then( m => m.NavbarMenuPageModule)
  },
  {
    path: 'position-requests',
    loadChildren: () => import('./Admin/position-requests/position-requests.module').then( m => m.PositionRequestsPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'target',
    loadChildren: () => import('./Admin/target/target.module').then( m => m.TargetPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'update-course',
    loadChildren: () => import('./Training/update-course/update-course.module').then( m => m.UpdateCoursePageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'course-studio',
    loadChildren: () => import('./Training/course-studio/course-studio.module').then( m => m.CourseStudioPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'update-quiz',
    loadChildren: () => import('./Training/update-quiz/update-quiz.module').then( m => m.UpdateQuizPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'view-feedback-admin',
    loadChildren: () => import('./Admin/view-feedback-admin/view-feedback-admin.module').then( m => m.ViewFeedbackAdminPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'view-ambassadors-admin',
    loadChildren: () => import('./Admin/view-ambassadors/view-ambassadors.module').then( m => m.ViewAmbassadorsPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'validate-registrations',
    loadChildren: () => import('./Admin/validate-registrations/validate-registrations.module').then( m => m.ValidateRegistrationsPageModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'view-faq-details',
    loadChildren: () => import('./Ambassador/faq/view-faq-details/view-faq-details.module').then( m => m.ViewFaqDetailsPageModule),
    canLoad: [AmbassadorAuthGuard]
  },
  {
    path: 'audit-trail',
    loadChildren: () => import('./Admin/audit-trail/audit-trail.module').then( m => m.AuditTrailPageModule),
    // canLoad: [AdminAuthGuard]
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
