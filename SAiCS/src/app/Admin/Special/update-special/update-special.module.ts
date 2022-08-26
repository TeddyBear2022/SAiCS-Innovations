import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSpecialPageRoutingModule } from './update-special-routing.module';

import { UpdateSpecialPage } from './update-special.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateSpecialPageRoutingModule
  ],
  declarations: [UpdateSpecialPage]
})
export class UpdateSpecialPageModule {}
