import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmbassadorFeedbackPageRoutingModule } from './view-ambassador-feedback-routing.module';

import { ViewAmbassadorFeedbackPage } from './view-ambassador-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAmbassadorFeedbackPageRoutingModule
  ],
  declarations: [ViewAmbassadorFeedbackPage]
})
export class ViewAmbassadorFeedbackPageModule {}
