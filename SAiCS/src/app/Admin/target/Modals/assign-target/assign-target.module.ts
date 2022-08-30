import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignTargetPageRoutingModule } from './assign-target-routing.module';

import { AssignTargetPage } from './assign-target.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignTargetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class AssignTargetPageModule {}
