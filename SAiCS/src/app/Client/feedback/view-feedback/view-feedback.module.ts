import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFeedbackPageRoutingModule } from './view-feedback-routing.module';

import { ViewFeedbackPage } from './view-feedback.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFeedbackPageRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [ViewFeedbackPage]
})
export class ViewFeedbackPageModule {}
