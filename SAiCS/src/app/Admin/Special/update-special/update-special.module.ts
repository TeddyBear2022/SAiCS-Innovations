import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSpecialPageRoutingModule } from './update-special-routing.module';

import { UpdateSpecialPage } from './update-special.page';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    IonicModule,
    UpdateSpecialPageRoutingModule
  ],
  declarations: [UpdateSpecialPage]
})
export class UpdateSpecialPageModule {}
