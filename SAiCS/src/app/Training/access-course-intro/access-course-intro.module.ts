import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessCourseIntroPageRoutingModule } from './access-course-intro-routing.module';

import { AccessCourseIntroPage } from './access-course-intro.page';
import { YouTubePlayerModule } from "@angular/youtube-player";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessCourseIntroPageRoutingModule,
    ReactiveFormsModule,
    YouTubePlayerModule
  ],
  declarations: [AccessCourseIntroPage]
})
export class AccessCourseIntroPageModule {}
