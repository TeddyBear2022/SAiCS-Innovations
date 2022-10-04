import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
import { OrderDetailsComponent } from './order-details/order-details.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  orders: any = [];
  orderTray: any = [];
  session: any;
  orderStat: string = 'pending'

  constructor(
    private tmpStorage: TemporaryStorage,
    private modalCtrl: ModalController,
    private api: ApiService,
  ) {
    for (let key in this.orders) {
      if (this.orders.hasOwnProperty(key)) {
        this.orderTray.push(this.orders[key]);
      }
    }
  
  }

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo();
    this.ViewHistory();
  }

  // ionViewWillEnter(){
  //   document.getElementById("All").style.display = 'flex';
  // }


  openOrder(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(cityName).style.display = 'flex';
    evt.currentTarget.className += ' active';
  }

  ChooseOption(option: string)
  {
     this.orderStat = option;
     console.log(this.orderStat);
     
  }

  ViewHistory() {
    this.api.ClientOrderHistory(this.session[0].id).subscribe((res) => {
      this.orders = res;
      console.log(this.orders);
    });
  }

  async ViewOrderDetails(id: number) {
    const modal = await this.modalCtrl.create({
      component: OrderDetailsComponent,
      componentProps: {
        order: id,
      },
      cssClass: 'customModal',
    });
    await modal.present();
  }


}
