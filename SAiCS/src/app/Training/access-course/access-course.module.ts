import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessCoursePageRoutingModule } from './access-course-routing.module';

import { AccessCoursePage } from './access-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessCoursePageRoutingModule
  ],
  declarations: [AccessCoursePage]
})
export class AccessCoursePageModule {}
