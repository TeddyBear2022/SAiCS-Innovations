import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TargetPageRoutingModule } from './target-routing.module';

import { TargetPage } from './target.page';

import { AssignTargetPage } from './Modals/assign-target/assign-target.page';
import { UpdateTargetPage } from './Modals/update-target/update-target.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TargetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TargetPage ,AssignTargetPage,UpdateTargetPage],
  entryComponents:[AssignTargetPage,UpdateTargetPage]
})
export class TargetPageModule {}
