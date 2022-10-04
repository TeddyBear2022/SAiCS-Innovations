import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-landing-page-admin',
  templateUrl: './landing-page-admin.page.html',
  styleUrls: ['./landing-page-admin.page.scss'],
})
export class LandingPageAdminPage implements OnInit {

  //Variable
  username
  constructor(public popoverController: PopoverController,
    private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.username = localStorage.getItem('UserName')
  }

   // Show Profile optionss when icon on right of navbar clicked function
   async presentPopover(event)
   {
     const popover = await this.popoverController.create({
       component: ProfilePopoverComponent,
       event
     });
     return await popover.present();
   }
 

}
