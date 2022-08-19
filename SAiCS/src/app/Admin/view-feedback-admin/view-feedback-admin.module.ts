import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFeedbackAdminPageRoutingModule } from './view-feedback-admin-routing.module';

import { ViewFeedbackAdminPage } from './view-feedback-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFeedbackAdminPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewFeedbackAdminPage]
})
export class ViewFeedbackAdminPageModule {}
