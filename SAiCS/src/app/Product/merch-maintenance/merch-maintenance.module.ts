import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchMaintenancePageRoutingModule } from './merch-maintenance-routing.module';

import { MerchMaintenancePage } from './merch-maintenance.page';
import { MaintainModule } from './modals/maintain/maintain.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchMaintenancePageRoutingModule,
    MaintainModule
  ],
  declarations: [MerchMaintenancePage]
})
export class MerchMaintenancePageModule {}
