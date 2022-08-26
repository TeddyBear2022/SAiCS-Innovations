import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsCartPageRoutingModule } from './clients-cart-routing.module';

import { ClientsCartPage } from './clients-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsCartPageRoutingModule
  ],
  declarations: [ClientsCartPage]
})
export class ClientsCartPageModule {}
