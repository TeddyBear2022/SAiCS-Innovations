import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbassadorSpecialItemPageRoutingModule } from './ambassador-special-item-routing.module';

import { AmbassadorSpecialItemPage } from './ambassador-special-item.page';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbassadorSpecialItemPageRoutingModule,
    PipesModule
  ],
  declarations: [AmbassadorSpecialItemPage]
})
export class AmbassadorSpecialItemPageModule {}
