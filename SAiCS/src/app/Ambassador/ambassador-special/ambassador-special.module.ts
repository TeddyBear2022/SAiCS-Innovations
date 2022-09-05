import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbassadorSpecialPageRoutingModule } from './ambassador-special-routing.module';

import { AmbassadorSpecialPage } from './ambassador-special.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbassadorSpecialPageRoutingModule
  ],
  declarations: [AmbassadorSpecialPage]
})
export class AmbassadorSpecialPageModule {}
