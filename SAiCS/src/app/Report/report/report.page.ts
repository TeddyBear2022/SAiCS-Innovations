import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(public popoverController: PopoverController) { }

  //showReport = {ambassadorlist:true, recruitmentlist: false, bestselling: false,productlist: false, sales: false}

  ngOnInit() {
  }


    //Profile popover
    async presentPopover(event)
    {
      const popover = await this.popoverController.create({
        component: ProfilePopoverComponent,
        event
      });
      return await popover.present();
    }
}
