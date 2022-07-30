import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizSessionPageRoutingModule } from './quiz-session-routing.module';

import { QuizSessionPage } from './quiz-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizSessionPageRoutingModule
  ],
  declarations: [QuizSessionPage]
})
export class QuizSessionPageModule {}
