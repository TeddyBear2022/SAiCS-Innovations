import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';


@Component({
  selector: 'app-view-ambassador',
  templateUrl: './view-ambassador.page.html',
  styleUrls: ['./view-ambassador.page.scss'],
})
export class ViewAmbassadorPage implements OnInit {

  constructor(public popoverController: PopoverController){}

  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }


  ngOnInit() {
  }

}
