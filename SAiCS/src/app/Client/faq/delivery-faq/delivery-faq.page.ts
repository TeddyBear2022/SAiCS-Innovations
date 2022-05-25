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
  showText: any = []
  constructor(public popoverController: PopoverController, private api:ApiService){}

  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ngOnInit() {
    this.GetDeliveryFAQ();
  }

  // display: boolean = false;
  // display2: boolean = false;
  // display3: boolean = false;
  // display4: boolean = false;

  // txtClick1(){
  //   this.display = !this.display
  // }

  // txtClick2(){
  //   this.display2 = !this.display2
  // }

  // txtClick3(){
  //   this.display3 = !this.display3
  // }

  // txtClick4(){
  //   this.display4 = !this.display4
  // }
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
