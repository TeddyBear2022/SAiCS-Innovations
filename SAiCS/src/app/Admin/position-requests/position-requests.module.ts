import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PositionRequestsPageRoutingModule } from './position-requests-routing.module';

import { PositionRequestsPage } from './position-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PositionRequestsPageRoutingModule
  ],
  declarations: [PositionRequestsPage]
})
export class PositionRequestsPageModule {}
