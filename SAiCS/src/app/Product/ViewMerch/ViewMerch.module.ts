import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductPageRoutingModule } from './ViewMerch-routing.module';

import { ViewMerchPage } from './ViewMerch.page';
import { CreateMerchModalComponent } from '../CreateMerchModal/CreateMerchModal.component';
import { UpdateMerchModalComponent } from '../UpdateMerchModal/UpdateMerchModal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewProductPageRoutingModule
  ],
  declarations: [ViewMerchPage, CreateMerchModalComponent, UpdateMerchModalComponent],
  entryComponents: [CreateMerchModalComponent,UpdateMerchModalComponent]
})
export class ViewProductPageModule {}
