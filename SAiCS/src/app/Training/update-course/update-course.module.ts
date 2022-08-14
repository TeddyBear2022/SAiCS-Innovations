import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCoursePageRoutingModule } from './update-course-routing.module';

import { UpdateCoursePage } from './update-course.page';
import { UpdateSectionModalPage } from './Modals/update-section-modal/update-section-modal.page';
import { UpdateQuizModalPage } from './Modals/update-quiz-modal/update-quiz-modal.page';
import { AddContentModalComponent } from '../new-course/add-content-modal/add-content-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCoursePageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [UpdateCoursePage,UpdateSectionModalPage,UpdateQuizModalPage],
  entryComponents:[UpdateSectionModalPage,AddContentModalComponent] 
})
export class UpdateCoursePageModule {}
