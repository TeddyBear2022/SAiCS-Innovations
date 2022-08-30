import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseStudioPageRoutingModule } from './course-studio-routing.module';

import { CourseStudioPage } from './course-studio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseStudioPageRoutingModule
  ],
  declarations: [CourseStudioPage]
})
export class CourseStudioPageModule {}
