import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-delivery-faq',
  templateUrl: './delivery-faq.page.html',
  styleUrls: ['./delivery-faq.page.scss'],
})
export class DeliveryFaqPage implements OnInit {

  constructor(public popoverController: PopoverController){}

  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ngOnInit() {
  }

}
