import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClientFaqDetailsPageRoutingModule } from './view-client-faq-details-routing.module';

import { ViewClientFaqDetailsPage } from './view-client-faq-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewClientFaqDetailsPageRoutingModule
  ],
  declarations: [ViewClientFaqDetailsPage]
})
export class ViewClientFaqDetailsPageModule {}
