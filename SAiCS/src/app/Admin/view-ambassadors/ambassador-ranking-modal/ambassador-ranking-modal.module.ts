import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbassadorRankingModalPageRoutingModule } from './ambassador-ranking-modal-routing.module';

import { AmbassadorRankingModalPage } from './ambassador-ranking-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbassadorRankingModalPageRoutingModule
  ],
  declarations: []
})
export class AmbassadorRankingModalPageModule {}
