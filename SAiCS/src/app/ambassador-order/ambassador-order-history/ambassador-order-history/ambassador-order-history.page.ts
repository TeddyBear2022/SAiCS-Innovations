import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { ViewOrderhistoryDetailsComponent } from '../view-orderhistory-details/view-orderhistory-details.component';
import { MenuController } from '@ionic/angular';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-ambassador-order-history',
  templateUrl: './ambassador-order-history.page.html',
  styleUrls: ['./ambassador-order-history.page.scss'],
})
export class AmbassadorOrderHistoryPage implements OnInit {
  @ViewChild('keywordsInput' ) fileInput: ElementRef<HTMLInputElement>;
  orders: any = []
  session: any
  constructor(public popoverController: PopoverController, private tmpStorage:TemporaryStorage, private modalCtrl: ModalController, private api: ApiService, private menu:MenuController) { }

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo()
    this.fileInput.nativeElement.click()
    this.ViewHistory()

  }

  ionViewDidEnter(){
    document.getElementById("All").style.display = 'flex';
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
    this.api.OrderHistory(this.session[0].id).subscribe(res => {
      this.orders = res

      console.log(this.orders);
      
    })
    this.menu.enable(true, 'ambassador-menu');
  }
  
async ViewOrderDetails(id: number)
{
  
 const modal = await this.modalCtrl.create({
    component: ViewOrderhistoryDetailsComponent,
    componentProps: {
     order: id
    },
    cssClass: 'customModal'
  });
  await modal.present();
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
