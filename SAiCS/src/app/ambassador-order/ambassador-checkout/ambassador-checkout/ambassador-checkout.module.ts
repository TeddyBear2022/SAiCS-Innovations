import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbassadorCheckoutPageRoutingModule } from './ambassador-checkout-routing.module';

import { AmbassadorCheckoutPage } from './ambassador-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AmbassadorCheckoutPageRoutingModule
  ],
  declarations: [AmbassadorCheckoutPage]
})
export class AmbassadorCheckoutPageModule {}
