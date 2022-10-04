import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeginCoursePageRoutingModule } from './begin-course-routing.module';

import { BeginCoursePage } from './begin-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeginCoursePageRoutingModule
  ],
  declarations: [BeginCoursePage]
})
export class BeginCoursePageModule {}
