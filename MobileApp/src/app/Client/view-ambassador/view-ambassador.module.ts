import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmbassadorPageRoutingModule } from './view-ambassador-routing.module';

import { ViewAmbassadorPage } from './view-ambassador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAmbassadorPageRoutingModule
  ],
  declarations: [ViewAmbassadorPage]
})
export class ViewAmbassadorPageModule {}
