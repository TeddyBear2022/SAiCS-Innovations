import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-yt-video',
  templateUrl: './yt-video.page.html',
  styleUrls: ['./yt-video.page.scss'],
})
export class YtVideoPage implements OnInit {

  username

  constructor(private popoverController:PopoverController) { }

  ngOnInit() {
     //Username
     this.username = localStorage.getItem('UserName')
  }

  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }
}
