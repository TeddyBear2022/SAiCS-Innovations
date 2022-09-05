import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbassadorOrderHistoryPageRoutingModule } from './ambassador-order-history-routing.module';

import { AmbassadorOrderHistoryPage } from './ambassador-order-history.page';
import { ViewOrderhistoryDetailsComponent } from '../view-orderhistory-details/view-orderhistory-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbassadorOrderHistoryPageRoutingModule
  ],
  declarations: [AmbassadorOrderHistoryPage, ViewOrderhistoryDetailsComponent],
  entryComponents:[ViewOrderhistoryDetailsComponent]
})
export class AmbassadorOrderHistoryPageModule {}
