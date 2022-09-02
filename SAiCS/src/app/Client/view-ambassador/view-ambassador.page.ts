import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';


@Component({
  selector: 'app-view-ambassador',
  templateUrl: './view-ambassador.page.html',
  styleUrls: ['./view-ambassador.page.scss'],
})
export class ViewAmbassadorPage implements OnInit {

  session: any
  myAmbassador: any

  constructor(public popoverController: PopoverController,private api: ApiService, private menu: MenuController,private tmpStorage:TemporaryStorage,){}

  // Show Profile optionss when icon on right of navbar clicked function
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }


  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo()
    this.menu.enable(true, 'client-menu');
    this.MyAmbassador();
  }


  MyAmbassador() {
    this.api.GetAssociatedAmbassador(this.session[0].id).subscribe((data) => {
      this.myAmbassador = data;
      console.log(this.myAmbassador);
    });
  }
}
