import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialPageRoutingModule } from './special-routing.module';

import { SpecialPage } from './special.page';
import { PipesModule } from 'Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialPageRoutingModule,
    PipesModule
  ],
  declarations: [SpecialPage]
})
export class SpecialPageModule {}
