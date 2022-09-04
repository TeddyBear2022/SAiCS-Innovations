import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoRefferralCodePageRoutingModule } from './no-refferral-code-routing.module';

import { NoRefferralCodePage } from './no-refferral-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoRefferralCodePageRoutingModule
  ],
  declarations: [NoRefferralCodePage]
})
export class NoRefferralCodePageModule {}
