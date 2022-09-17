import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductPageRoutingModule } from './ViewMerch-routing.module';

import { ViewMerchPage } from './ViewMerch.page';
import { CreateMerchModalComponent } from '../CreateMerchModal/CreateMerchModal.component';
import { UpdateMerchModalComponent } from '../UpdateMerchModal/UpdateMerchModal.component';
import { MaintainVatComponent } from '../maintain-vat/maintain-vat.component';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewProductPageRoutingModule,
    PipesModule
  ],
  declarations: [ViewMerchPage, CreateMerchModalComponent, UpdateMerchModalComponent, MaintainVatComponent],
  entryComponents: [CreateMerchModalComponent,UpdateMerchModalComponent, MaintainVatComponent]
})
export class ViewProductPageModule {}
