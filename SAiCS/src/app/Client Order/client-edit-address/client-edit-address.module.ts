import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientEditAddressPageRoutingModule } from './client-edit-address-routing.module';

import { ClientEditAddressPage } from './client-edit-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClientEditAddressPageRoutingModule
  ],
  declarations: [ClientEditAddressPage]
})
export class ClientEditAddressPageModule {}
