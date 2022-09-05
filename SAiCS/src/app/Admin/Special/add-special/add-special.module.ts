import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSpecialPageRoutingModule } from './add-special-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { AddSpecialPage } from './add-special.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    IonicModule,
    AddSpecialPageRoutingModule
  ],
  declarations: [AddSpecialPage]
})
export class AddSpecialPageModule {}
