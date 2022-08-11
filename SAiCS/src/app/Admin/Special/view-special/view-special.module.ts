import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSpecialPageRoutingModule } from './view-special-routing.module';

import { ViewSpecialPage } from './view-special.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSpecialPageRoutingModule
  ],
  declarations: [ViewSpecialPage]
})
export class ViewSpecialPageModule {}
