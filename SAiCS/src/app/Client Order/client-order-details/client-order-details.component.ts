import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-client-order-details',
  templateUrl: './client-order-details.component.html',
  styleUrls: ['./client-order-details.component.scss'],
})
export class ClientOrderDetailsComponent implements OnInit {
  @Input() order: number;
  discount = 0;
  subtotal = 0;
  vat = 0;
  orderItems: any = [];
  data: any

  constructor(private modalCtrl: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.OrderDetails(this.order)
  }

  OrderDetails(id: number)
  {
    this.api.ClientViewOrderDetails(id).subscribe(res => {
      
      this.data = res
      this.orderItems = this.data.orderItems

      this.subtotal = this.orderItems.reduce(
        (sum, x) => ({
          quantity: 1,
          price: sum.price + x.quantity * x.price,
        }),
        { quantity: 1, price: 0 }
      ).price;
      
      console.log(res);
    })
  }

  get OrderTotal()
  {
    let discountValue = this.discount * this.subtotal
      if(this.data.delivery)
      return this.subtotal - ( discountValue + 200)
      else
      return this.subtotal - discountValue
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}