import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmbassadorsPageRoutingModule } from './view-ambassadors-routing.module';

import { ViewAmbassadorsPage } from './view-ambassadors.page';
import { AmbassadorOrderHistoryComponent } from 'src/app/modals/ambassador-order-history/ambassador-order-history.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAmbassadorsPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    ViewAmbassadorsPage,
    AmbassadorOrderHistoryComponent
  ]
})
export class ViewAmbassadorsPageModule {}
