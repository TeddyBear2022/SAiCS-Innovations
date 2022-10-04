import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOrdersPageRoutingModule } from './view-orders-routing.module';

import { ViewOrdersPage } from './view-orders.page';
import { UpdateOrderStatusComponent } from '../update-order-status/update-order-status.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewOrdersPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [ViewOrdersPage, UpdateOrderStatusComponent],
  entryComponents: [UpdateOrderStatusComponent]
})
export class ViewOrdersPageModule {}
