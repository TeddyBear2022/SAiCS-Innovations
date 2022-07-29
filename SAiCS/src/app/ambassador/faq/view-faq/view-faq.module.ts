import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFaqPageRoutingModule } from './view-faq-routing.module';

import { ViewFaqPage } from './view-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFaqPageRoutingModule
  ],
  declarations: [ViewFaqPage]
})
export class ViewFaqPageModule {}
