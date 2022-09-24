import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbassadorSpecialPageRoutingModule } from './ambassador-special-routing.module';

import { AmbassadorSpecialPage } from './ambassador-special.page';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbassadorSpecialPageRoutingModule,
    PipesModule
  ],
  declarations: [AmbassadorSpecialPage]
})
export class AmbassadorSpecialPageModule {}
