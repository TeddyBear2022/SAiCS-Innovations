import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  username
  constructor(public popoverController: PopoverController,
    private menu:MenuController) { }
 
  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.username = localStorage.getItem('UserName')
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
