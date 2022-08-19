import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TargetPageRoutingModule } from './target-routing.module';

import { TargetPage } from './target.page';

import { AssignTargetPage } from './Modals/assign-target/assign-target.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TargetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TargetPage ,AssignTargetPage],
  entryComponents:[AssignTargetPage ]
})
export class TargetPageModule {}
