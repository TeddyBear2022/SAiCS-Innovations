import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessCourseIntroPageRoutingModule } from './access-course-intro-routing.module';

import { AccessCourseIntroPage } from './access-course-intro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessCourseIntroPageRoutingModule
  ],
  declarations: [AccessCourseIntroPage]
})
export class AccessCourseIntroPageModule {}
