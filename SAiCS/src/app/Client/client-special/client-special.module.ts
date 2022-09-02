import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientSpecialPageRoutingModule } from './client-special-routing.module';

import { ClientSpecialPage } from './client-special.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientSpecialPageRoutingModule
  ],
  declarations: [ClientSpecialPage]
})
export class ClientSpecialPageModule {}
