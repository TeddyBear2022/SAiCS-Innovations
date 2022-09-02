import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFaqDetailsPageRoutingModule } from './view-faq-details-routing.module';

import { ViewFaqDetailsPage } from './view-faq-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFaqDetailsPageRoutingModule
  ],
  declarations: [ViewFaqDetailsPage]
})
export class ViewFaqDetailsPageModule {}
