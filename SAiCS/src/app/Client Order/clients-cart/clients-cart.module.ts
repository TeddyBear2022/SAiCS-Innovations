import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsCartPageRoutingModule } from './clients-cart-routing.module';

import { ClientsCartPage } from './clients-cart.page';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsCartPageRoutingModule,
    PipesModule
  ],
  declarations: [ClientsCartPage]
})
export class ClientsCartPageModule {}
