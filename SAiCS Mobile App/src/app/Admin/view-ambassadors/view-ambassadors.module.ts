import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmbassadorsPageRoutingModule } from './view-ambassadors-routing.module';

import { ViewAmbassadorsPage } from './view-ambassadors.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAmbassadorsPageRoutingModule,
    Ng2SearchPipeModule
    
  ],
  declarations: [ViewAmbassadorsPage]
})
export class ViewAmbassadorsPageModule {}
