import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-landing-page-admin',
  templateUrl: './landing-page-admin.page.html',
  styleUrls: ['./landing-page-admin.page.scss'],
})
export class LandingPageAdminPage implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
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
