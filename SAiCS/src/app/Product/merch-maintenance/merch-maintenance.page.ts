import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-merch-maintenance',
  templateUrl: './merch-maintenance.page.html',
  styleUrls: ['./merch-maintenance.page.scss'],
})
export class MerchMaintenancePage implements OnInit {
  
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
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
