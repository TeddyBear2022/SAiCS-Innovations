import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
import { ClientOrderDetailsComponent } from '../client-order-details/client-order-details.component';

@Component({
  selector: 'app-client-orderhistory',
  templateUrl: './client-orderhistory.page.html',
  styleUrls: ['./client-orderhistory.page.scss'],
})
export class ClientOrderhistoryPage implements OnInit {

  orders: any = []
  session: any

  constructor(private modalCtrl: ModalController, private tmpStorage:TemporaryStorage, private api: ApiService, public popoverController:PopoverController, private menu:MenuController) { }

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo()
    this.ViewHistory()
  }

  openOrder(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "flex";
    evt.currentTarget.className += " active";
  }

  ViewHistory()
  {
    this.api.ClientOrderHistory(this.session[0].id).subscribe(res => {
      this.orders = res

      console.log(this.orders);
      
    })
    this.menu.enable(true, 'ambassador-menu');
  }

  async ViewOrderDetails(id: number)
{
  
 const modal = await this.modalCtrl.create({
    component: ClientOrderDetailsComponent,
    componentProps: {
     order: id
    },
    cssClass: 'customModal'
  });
  await modal.present();
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
