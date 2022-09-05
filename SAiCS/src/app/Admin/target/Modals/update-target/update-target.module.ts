import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateTargetPageRoutingModule } from './update-target-routing.module';

import { UpdateTargetPage } from './update-target.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateTargetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class UpdateTargetPageModule {}
