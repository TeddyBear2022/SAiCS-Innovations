import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-general-maintainance',
  templateUrl: './general-maintainance.page.html',
  styleUrls: ['./general-maintainance.page.scss'],
})
export class GeneralMaintainancePage implements OnInit {

  username;
  constructor(public popoverController: PopoverController,
    private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
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
