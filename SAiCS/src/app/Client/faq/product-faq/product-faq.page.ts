import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { FAQ } from 'src/app/Models/FAQ';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-product-faq',
  templateUrl: './product-faq.page.html',
  styleUrls: ['./product-faq.page.scss'],
})
export class ProductFaqPage implements OnInit {
  ProductFAQs: FAQ[];
  showText: any = [];
  constructor(
    public popoverController: PopoverController,
    private api: ApiService,
    private menu: MenuController
  ) {
    this.menu.enable(true, 'client-menu');
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }

  ngOnInit() {
    this.GetProductFAQ();
  }

  // display: boolean = false;
  // display2: boolean = false;
  // display3: boolean = false;

  // txtClick1(){
  //   this.display = !this.display
  // }

  // txtClick2(){
  //   this.display2 = !this.display2
  // }

  // txtClick3(){
  //   this.display3 = !this.display3
  // }
  hoverStateIn(index) {
    this.showText[index] = true;
  }

  hoverStateOut(index) {
    this.showText[index] = false;
  }

  GetProductFAQ() {
    this.api.GetProductFAQ().subscribe((data) => {
      this.ProductFAQs = data;
      console.log(data);
    });
  }
}
