import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-view-special',
  templateUrl: './view-special.page.html',
  styleUrls: ['./view-special.page.scss'],
})
export class ViewSpecialPage implements OnInit {
  specials = []
  constructor( public popoverController: PopoverController, ) { }

  ngOnInit() {
  }

  createSpecial()
  {

  }

  updateSpecial(id: number)
  {

  }

  DeleteSpecial(id: number)
  {
    
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
