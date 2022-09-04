import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCoursePageRoutingModule } from './new-course-routing.module';

import { NewCoursePage } from './new-course.page';
import { AddQuizModalComponent } from './add-quiz-modal/add-quiz-modal.component';
import { AddContentModalComponent } from './add-content-modal/add-content-modal.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewCoursePageRoutingModule,
    
  ],
  declarations: [NewCoursePage,AddQuizModalComponent],
  entryComponents:[AddQuizModalComponent,AddContentModalComponent] 
})
export class NewCoursePageModule {}