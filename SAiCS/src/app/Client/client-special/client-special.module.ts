import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientSpecialPageRoutingModule } from './client-special-routing.module';

import { ClientSpecialPage } from './client-special.page';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientSpecialPageRoutingModule,
    PipesModule
  ],
  declarations: [ClientSpecialPage]
})
export class ClientSpecialPageModule {}
