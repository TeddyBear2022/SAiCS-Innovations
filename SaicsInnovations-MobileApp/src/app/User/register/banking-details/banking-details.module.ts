import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankingDetailsPageRoutingModule } from './banking-details-routing.module';

import { BankingDetailsPage } from './banking-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankingDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BankingDetailsPage]
})
export class BankingDetailsPageModule {}
