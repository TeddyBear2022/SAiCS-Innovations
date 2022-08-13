import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSectionModalPageRoutingModule } from './update-section-modal-routing.module';

import { UpdateSectionModalPage } from './update-section-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateSectionModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class UpdateSectionModalPageModule {}
