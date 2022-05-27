import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageAdminPageRoutingModule } from './landing-page-admin-routing.module';

import { LandingPageAdminPage } from './landing-page-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageAdminPageRoutingModule
  ],
  declarations: [LandingPageAdminPage]
})
export class LandingPageAdminPageModule {}
