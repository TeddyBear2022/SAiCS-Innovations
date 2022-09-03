import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBankingDetailsPageRoutingModule } from './update-banking-details-routing.module';

import { UpdateBankingDetailsPage } from './update-banking-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateBankingDetailsPageRoutingModule
  ],
  declarations: []
})
export class UpdateBankingDetailsPageModule {}
