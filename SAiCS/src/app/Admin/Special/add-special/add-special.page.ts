import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-add-special',
  templateUrl: './add-special.page.html',
  styleUrls: ['./add-special.page.scss'],
})
export class AddSpecialPage implements OnInit {

  constructor(public popoverController: PopoverController,) { }

  ngOnInit() {
  }

  //Profile popover
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }
}
