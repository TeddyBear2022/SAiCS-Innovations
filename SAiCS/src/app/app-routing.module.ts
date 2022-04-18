import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'register',
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
    path: 'feedback',
    loadChildren: () => import('./Client/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./Client/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./User/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
