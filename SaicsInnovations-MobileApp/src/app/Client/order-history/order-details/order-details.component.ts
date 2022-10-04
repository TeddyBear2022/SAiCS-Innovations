import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() order: number;
  discount = 0;
  subtotal = 0;
  vat = 0;
  orderItems: any = [];
  data: any
  
  constructor(private modalCtrl: ModalController, private api: ApiService,) {
   }

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
      if(this.data.delivery)
      return this.subtotal + this.data.deliveryAmt
      else
      return this.subtotal 
  }

  get CalculatedVAT() {
    return this.data.vat * this.subtotal;
  }

 

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
