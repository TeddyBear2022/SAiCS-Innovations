import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryFaqPageRoutingModule } from './delivery-faq-routing.module';

import { DeliveryFaqPage } from './delivery-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryFaqPageRoutingModule
  ],
  declarations: [DeliveryFaqPage]
})
export class DeliveryFaqPageModule {}
