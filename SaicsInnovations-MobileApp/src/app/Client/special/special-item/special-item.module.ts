import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialItemPageRoutingModule } from './special-item-routing.module';

import { SpecialItemPage } from './special-item.page';
import { PipesModule } from 'Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialItemPageRoutingModule,
    PipesModule
  ],
  declarations: [SpecialItemPage]
})
export class SpecialItemPageModule {}
