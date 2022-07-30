import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersFaqPageRoutingModule } from './orders-faq-routing.module';

import { OrdersFaqPage } from './orders-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersFaqPageRoutingModule
  ],
  declarations: [OrdersFaqPage]
})
export class OrdersFaqPageModule {}
