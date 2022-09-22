import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private popoverController:PopoverController) {}

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
