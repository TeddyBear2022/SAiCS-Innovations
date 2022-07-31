import { Component, OnInit } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { AlertController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  constructor(public popoverController:PopoverController, public alertController: AlertController) { }

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
