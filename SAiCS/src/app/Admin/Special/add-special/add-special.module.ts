import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSpecialPageRoutingModule } from './add-special-routing.module';

import { AddSpecialPage } from './add-special.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSpecialPageRoutingModule
  ],
  declarations: [AddSpecialPage]
})
export class AddSpecialPageModule {}
