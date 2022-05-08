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

  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  display4: boolean = false;

  txtClick1(){
    this.display = !this.display
  }

  txtClick2(){
    this.display2 = !this.display2
  }

  txtClick3(){
    this.display3 = !this.display3
  }

  txtClick4(){
    this.display4 = !this.display4
  }

}
