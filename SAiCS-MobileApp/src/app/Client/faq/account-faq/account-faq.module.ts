import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountFaqPageRoutingModule } from './account-faq-routing.module';

import { AccountFaqPage } from './account-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountFaqPageRoutingModule
  ],
  declarations: [AccountFaqPage]
})
export class AccountFaqPageModule {}
