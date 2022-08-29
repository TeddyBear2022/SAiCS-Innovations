import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YtVideoPageRoutingModule } from './yt-video-routing.module';

import { YtVideoPage } from './yt-video.page';

import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YtVideoPageRoutingModule,
    YouTubePlayerModule    
  ],
  declarations: [YtVideoPage]
})
export class YtVideoPageModule {}
