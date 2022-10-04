import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  MenuController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
import { ClientOrderDetailsComponent } from '../client-order-details/client-order-details.component';

@Component({
  selector: 'app-client-orderhistory',
  templateUrl: './client-orderhistory.page.html',
  styleUrls: ['./client-orderhistory.page.scss'],
})
export class ClientOrderhistoryPage implements OnInit {
  orders: any = [];
  orderTray: any = [];
  session: any;
  p
  p1
  p2
  username;

  @ViewChild('All' ) fileInput: ElementRef;
  @ViewChild('clickOnView') clickOnView: ElementRef;

  constructor(
    private modalCtrl: ModalController,
    private tmpStorage: TemporaryStorage,
    private api: ApiService,
    public popoverController: PopoverController,
    private menu: MenuController,
    private cartService: CartService
  ) {
    for (let key in this.orders) {
      if (this.orders.hasOwnProperty(key)) {
        this.orderTray.push(this.orders[key]);
      }
    }
  
  }

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.session = this.tmpStorage.getSessioninfo();
    this.ViewHistory();
    this.username = localStorage.getItem('UserName');
  }

  ionViewDidEnter(){
    document.getElementById("All").style.display = 'flex';
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }

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

  ViewHistory() {
    this.api.ClientOrderHistory(this.session[0].id).subscribe((res) => {
      this.orders = res;

      console.log(this.orders);
    });
    this.menu.enable(true, 'client-menu');
  }

  async ViewOrderDetails(id: number) {
    const modal = await this.modalCtrl.create({
      component: ClientOrderDetailsComponent,
      componentProps: {
        order: id,
      },
      cssClass: 'customModal',
    });
    await modal.present();
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
