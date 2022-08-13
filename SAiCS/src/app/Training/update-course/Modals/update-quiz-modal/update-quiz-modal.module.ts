import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateQuizModalPageRoutingModule } from './update-quiz-modal-routing.module';

import { UpdateQuizModalPage } from './update-quiz-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateQuizModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class UpdateQuizModalPageModule {}
