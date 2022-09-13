import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmbassadorCartPageRoutingModule } from './view-ambassador-cart-routing.module';

import { ViewAmbassadorCartPage } from './view-ambassador-cart.page';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAmbassadorCartPageRoutingModule,
    PipesModule
  ],
  declarations: [ViewAmbassadorCartPage]
})
export class ViewAmbassadorCartPageModule {}
