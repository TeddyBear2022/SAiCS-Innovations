import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmbassadorPageRoutingModule } from './view-ambassador-routing.module';

import { ViewAmbassadorPage } from './view-ambassador.page';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAmbassadorPageRoutingModule,
    PipesModule
  ],
  declarations: [ViewAmbassadorPage]
})
export class ViewAmbassadorPageModule {}
