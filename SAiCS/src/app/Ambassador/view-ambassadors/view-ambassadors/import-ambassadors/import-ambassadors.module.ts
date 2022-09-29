import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportAmbassadorsPageRoutingModule } from './import-ambassadors-routing.module';

import { ImportAmbassadorsPage } from './import-ambassadors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportAmbassadorsPageRoutingModule
  ],
  declarations: [ImportAmbassadorsPage]
})
export class ImportAmbassadorsPageModule {}
