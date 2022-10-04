import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbassadorCheckoutIiPageRoutingModule } from './ambassador-checkout-ii-routing.module';

import { AmbassadorCheckoutIiPage } from './ambassador-checkout-ii.page';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AmbassadorCheckoutIiPageRoutingModule,
    PipesModule
  ],
  declarations: [AmbassadorCheckoutIiPage]
})
export class AmbassadorCheckoutIiPageModule {}
