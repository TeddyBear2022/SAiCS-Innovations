import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClientsPageRoutingModule } from './view-clients-routing.module';

import { ViewClientsPage } from './view-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewClientsPageRoutingModule
  ],
  declarations: [ViewClientsPage]
})
export class ViewClientsPageModule {}
