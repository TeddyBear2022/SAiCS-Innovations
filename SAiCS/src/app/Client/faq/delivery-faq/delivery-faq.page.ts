import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FAQ } from 'src/app/Models/FAQ';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-delivery-faq',
  templateUrl: './delivery-faq.page.html',
  styleUrls: ['./delivery-faq.page.scss'],
})
export class DeliveryFaqPage implements OnInit {
  DeliveryFAQs: FAQ[]
  showText: any = [];

  constructor(public popoverController: PopoverController, private api: ApiService){}

  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ngOnInit() {
    this.GetDeliveryFAQ()
  }

  hoverStateIn(index){
    this.showText[index] = true;
  }

  hoverStateOut(index){
    this.showText[index] = false;
  }

  GetDeliveryFAQ(){
    this.api.GetDeliveryFAQ().subscribe(data =>
      {
        this.DeliveryFAQs = data
        console.log(data)
      })
  }

}
