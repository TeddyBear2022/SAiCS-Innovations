import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientstabsPageRoutingModule } from './clientstabs-routing.module';

import { ClientstabsPage } from './clientstabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientstabsPageRoutingModule
  ],
  declarations: [ClientstabsPage]
})
export class ClientstabsPageModule {}
