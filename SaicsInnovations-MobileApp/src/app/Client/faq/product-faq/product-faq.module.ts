import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductFaqPageRoutingModule } from './product-faq-routing.module';

import { ProductFaqPage } from './product-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductFaqPageRoutingModule
  ],
  declarations: [ProductFaqPage]
})
export class ProductFaqPageModule {}
