import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingsFaqPageRoutingModule } from './rankings-faq-routing.module';

import { RankingsFaqPage } from './rankings-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingsFaqPageRoutingModule
  ],
  declarations: [RankingsFaqPage]
})
export class RankingsFaqPageModule {}
