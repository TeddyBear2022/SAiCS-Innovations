import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContexthelpPageRoutingModule } from './contexthelp-routing.module';

import { ContexthelpPage } from './contexthelp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContexthelpPageRoutingModule
  ],
  declarations: []
})
export class ContexthelpPageModule {}
