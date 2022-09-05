import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmbassadorsPageRoutingModule } from './view-ambassadors-routing.module';

import { ViewAmbassadorsPage } from './view-ambassadors.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AmbassadorRankingModalPage } from './ambassador-ranking-modal/ambassador-ranking-modal.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewAmbassadorsPageRoutingModule,
    Ng2SearchPipeModule
    
  ],
  declarations: [ViewAmbassadorsPage, AmbassadorRankingModalPage],
  entryComponents: [AmbassadorRankingModalPage]
})
export class ViewAmbassadorsPageModule {}
