import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbassadorCheckoutIiPageRoutingModule } from './ambassador-checkout-ii-routing.module';

import { AmbassadorCheckoutIiPage } from './ambassador-checkout-ii.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbassadorCheckoutIiPageRoutingModule
  ],
  declarations: [AmbassadorCheckoutIiPage]
})
export class AmbassadorCheckoutIiPageModule {}