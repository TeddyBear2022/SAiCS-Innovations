import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOrdersPageRoutingModule } from './view-orders-routing.module';

import { ViewOrdersPage } from './view-orders.page';
import { UpdateOrderStatusComponent } from '../update-order-status/update-order-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewOrdersPageRoutingModule
  ],
  declarations: [ViewOrdersPage, UpdateOrderStatusComponent],
  entryComponents: [UpdateOrderStatusComponent]
})
export class ViewOrdersPageModule {}
