import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientSpecialItemPageRoutingModule } from './client-special-item-routing.module';

import { ClientSpecialItemPage } from './client-special-item.page';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientSpecialItemPageRoutingModule,
    PipesModule
  ],
  declarations: [ClientSpecialItemPage]
})
export class ClientSpecialItemPageModule {}
