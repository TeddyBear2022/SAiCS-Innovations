import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialItemPageRoutingModule } from './special-item-routing.module';

import { SpecialItemPage } from './special-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialItemPageRoutingModule
  ],
  declarations: [SpecialItemPage]
})
export class SpecialItemPageModule {}
