import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClientFaqPageRoutingModule } from './view-client-faq-routing.module';

import { ViewClientFaqPage } from './view-client-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewClientFaqPageRoutingModule
  ],
  declarations: [ViewClientFaqPage]
})
export class ViewClientFaqPageModule {}
