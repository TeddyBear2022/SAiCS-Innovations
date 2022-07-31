import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignCoursePageRoutingModule } from './assign-course-routing.module';

import { AssignCoursePage } from './assign-course.page';

import { AssignCourseModalComponent } from './assign-course-modal/assign-course-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignCoursePageRoutingModule
  ],
  declarations: [AssignCoursePage,AssignCourseModalComponent],
  entryComponents:[AssignCourseModalComponent]
})
export class AssignCoursePageModule {}
