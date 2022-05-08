import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FAQ } from 'src/app/Models/FAQ';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-product-faq',
  templateUrl: './product-faq.page.html',
  styleUrls: ['./product-faq.page.scss'],
})
export class ProductFaqPage implements OnInit {
  ProductFAQs: FAQ[]
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
    this.GetProductFAQ()
  }

   
  hoverStateIn(index){
    this.showText[index] = true;
  }

  hoverStateOut(index){
    this.showText[index] = false;
  }

  GetProductFAQ(){
    this.api.GetProductFAQ().subscribe(data =>
      {
        this.ProductFAQs = data
        console.log(data)
      })
  }

}
