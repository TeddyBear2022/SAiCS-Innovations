import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-special-maintainance',
  templateUrl: './special-maintainance.page.html',
  styleUrls: ['./special-maintainance.page.scss'],
})
export class SpecialMaintainancePage implements OnInit {

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
