import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { FAQ } from 'src/app/Models/FAQ';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-faq-details',
  templateUrl: './view-faq-details.page.html',
  styleUrls: ['./view-faq-details.page.scss'],
})
export class ViewFaqDetailsPage implements OnInit {

  DeliveryFAQs: FAQ[]
  showText: any = []
  constructor(public popoverController: PopoverController, 
    private api:ApiService, 
    private menu:MenuController){}

  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.api.GetSpecificFaq().subscribe(data => {
      this.DeliveryFAQs =data
      console.log(data);
      
    })
  }

  hoverStateIn(index){
    this.showText[index] = true;
  }

  hoverStateOut(index){
    this.showText[index] = false;
  }

  

}