import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateQuizPageRoutingModule } from './update-quiz-routing.module';

import { UpdateQuizPage } from './update-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateQuizPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateQuizPage]
})
export class UpdateQuizPageModule {}
