import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    ReactiveFormsModule,
    MatStepperModule
  ],
  declarations: [CheckoutPage],
  providers: []
})
export class CheckoutPageModule {}
