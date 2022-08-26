import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmbassadorCartPageRoutingModule } from './view-ambassador-cart-routing.module';

import { ViewAmbassadorCartPage } from './view-ambassador-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAmbassadorCartPageRoutingModule
  ],
  declarations: [ViewAmbassadorCartPage]
})
export class ViewAmbassadorCartPageModule {}
