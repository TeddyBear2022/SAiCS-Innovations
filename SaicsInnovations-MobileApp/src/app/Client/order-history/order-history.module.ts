import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderHistoryPageRoutingModule } from './order-history-routing.module';

import { OrderHistoryPage } from './order-history.page';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderHistoryPageRoutingModule
  ],
  declarations: [OrderHistoryPage, OrderDetailsComponent],
  entryComponents: [OrderDetailsComponent]

})
export class OrderHistoryPageModule {}
