import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-merch-maintenance',
  templateUrl: './merch-maintenance.page.html',
  styleUrls: ['./merch-maintenance.page.scss'],
})
export class MerchMaintenancePage implements OnInit {
  
  username
  

  constructor(public popoverController: PopoverController,private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.username = localStorage.getItem('UserName')
  }

  Back()
  {
    history.back()
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
