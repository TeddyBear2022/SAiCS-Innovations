import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientCheckoutPageRoutingModule } from './client-checkout-routing.module';

import { ClientCheckoutPage } from './client-checkout.page';
import { AddAddressPage } from '../add-address/add-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClientCheckoutPageRoutingModule
  ],
  declarations: [ClientCheckoutPage]
})
export class ClientCheckoutPageModule {}
