import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralMaintainancePageRoutingModule } from './general-maintainance-routing.module';

import { GeneralMaintainancePage } from './general-maintainance.page';
import { GeneralModule } from './components/general/general.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralMaintainancePageRoutingModule,
    GeneralModule
  ],
  declarations: [GeneralMaintainancePage]
})
export class GeneralMaintainancePageModule {}
