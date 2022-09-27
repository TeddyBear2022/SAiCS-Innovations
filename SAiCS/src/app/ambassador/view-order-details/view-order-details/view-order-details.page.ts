import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import * as FileSaver from 'file-saver';
import { MenuController } from '@ionic/angular';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.page.html',
  styleUrls: ['./view-order-details.page.scss'],
})
export class ViewOrderDetailsPage implements OnInit {
  orderId: number;
  details: any = [];
  subtotal = 0;
  username;

  constructor(
    private router: Router,
    private api: ApiService,
    private menu: MenuController,
    private cartService: CartService
  ) {
    router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        localStorage.removeItem('SalesOrderDetails');
      }
    });
  }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.orderId = JSON.parse(localStorage.getItem('SalesOrderDetails'));
    this.SalesOrderDetails(this.orderId);
    this.username = localStorage.getItem('UserName');
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }

  SalesOrderDetails(id: number) {
    this.api.SalesOrderDetails(id).subscribe((res) => {
      this.details = res;
      console.log(this.details);

      this.subtotal = this.details.orderItems.reduce(
        (sum, x) => ({
          quantity: 1,
          price: sum.price + x.quantity * x.price,
        }),
        { quantity: 1, price: 0 }
      ).price;
    });
  }

  DownloadPayment() {
    const byteCharacters = atob(this.details.payment);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    FileSaver.saveAs(
      blob,
      `${this.details.customer}-${this.details.id}-proof of payment.pdf`
    );
  }
}
