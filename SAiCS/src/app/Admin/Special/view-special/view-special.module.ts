import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSpecialPageRoutingModule } from './view-special-routing.module';

import { ViewSpecialPage } from './view-special.page';
import { MaintainSpecialTypeComponent } from '../maintain-special-type/maintain-special-type.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewSpecialPageRoutingModule
  ],
  declarations: [ViewSpecialPage, MaintainSpecialTypeComponent],
  entryComponents: [MaintainSpecialTypeComponent]
})
export class ViewSpecialPageModule {}
