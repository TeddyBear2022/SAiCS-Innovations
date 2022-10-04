import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmbassadorInfoPageRoutingModule } from './view-ambassador-info-routing.module';

import { ViewAmbassadorInfoPage } from './view-ambassador-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAmbassadorInfoPageRoutingModule
  ],
  declarations: [ViewAmbassadorInfoPage]
})
export class ViewAmbassadorInfoPageModule {}
