import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductPageRoutingModule } from './view-product-routing.module';

import { ViewProductPage } from './view-product.page';
import { CreateProductModalComponent } from '../create-product-modal/create-product-modal.component';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewProductPageRoutingModule
  ],
  declarations: [ViewProductPage, CreateProductModalComponent, UpdateProductModalComponent],
  entryComponents: [CreateProductModalComponent,UpdateProductModalComponent]
})
export class ViewProductPageModule {}
