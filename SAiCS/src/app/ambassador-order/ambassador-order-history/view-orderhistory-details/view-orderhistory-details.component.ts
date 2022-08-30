import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-orderhistory-details',
  templateUrl: './view-orderhistory-details.component.html',
  styleUrls: ['./view-orderhistory-details.component.scss'],
})
export class ViewOrderhistoryDetailsComponent implements OnInit {
  @Input() order: number;
  discount = 0;
  subtotal = 0;
  vat = 0;
  orderItems: any = [];
  data: any

  constructor( private modalCtrl: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.AmbassadorDiscount()
    this.OrderDetails(this.order)
    //console.log(this.order);
    

  }

  async AmbassadorDiscount() {
    let two = 2;
    var data = await this.api.AmbassadorDiscount(two.toString()).toPromise();
    var dataObj = JSON.parse(JSON.stringify(data[0].discount));
    this.discount = dataObj;
    console.log(`discount: ${this.discount}`);

    var vatData = await this.api.GetVAT().toPromise();
    var vatObj = JSON.parse(JSON.stringify(vatData));
    this.vat = vatObj;
    console.log(`discount: ${this.vat}`);
    
  }

  OrderDetails(id: number)
  {
    this.api.ViewOrderDetails(id).subscribe(res => {
      
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
