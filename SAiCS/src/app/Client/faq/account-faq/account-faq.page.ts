import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FAQ } from 'src/app/Models/FAQ';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-account-faq',
  templateUrl: './account-faq.page.html',
  styleUrls: ['./account-faq.page.scss'],
})
export class AccountFaqPage implements OnInit {
  AccountFAQs: FAQ[]
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
    this.GetAccountFAQ()
  }
  
  hoverStateIn(index){
    this.showText[index] = true;
  }

  hoverStateOut(index){
    this.showText[index] = false;
  }

  GetAccountFAQ(){
    this.api.GetAccountFAQ().subscribe(data =>
      {
        this.AccountFAQs = data
        console.log(data)
      })
  }

}
