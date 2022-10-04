import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialMaintainancePageRoutingModule } from './special-maintainance-routing.module';

import { SpecialMaintainancePage } from './special-maintainance.page';
import { SpModuleModule } from './components/sp-module/sp-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialMaintainancePageRoutingModule,
    SpModuleModule
  ],
  declarations: [SpecialMaintainancePage]
})
export class SpecialMaintainancePageModule {}
