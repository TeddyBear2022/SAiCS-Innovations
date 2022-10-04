import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { PositionRequestsVM } from 'src/app/Models/ViewModels/PositionRequestVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-position-requests',
  templateUrl: './position-requests.page.html',
  styleUrls: ['./position-requests.page.scss'],
})
export class PositionRequestsPage implements OnInit {

  constructor(public popoverController: PopoverController,
    private api:ApiService,
    private menu:MenuController) { }

    PositionRequests= [];

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.api.PositionRequests().subscribe(data =>{
      console.log(data)
      this.PositionRequests = data
      console.log(this.PositionRequests);
      
    })
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
