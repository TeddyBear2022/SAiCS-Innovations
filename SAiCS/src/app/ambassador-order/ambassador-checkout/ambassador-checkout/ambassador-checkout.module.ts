import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbassadorCheckoutPageRoutingModule } from './ambassador-checkout-routing.module';

import { AmbassadorCheckoutPage } from './ambassador-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbassadorCheckoutPageRoutingModule
  ],
  declarations: [AmbassadorCheckoutPage]
})
export class AmbassadorCheckoutPageModule {}
