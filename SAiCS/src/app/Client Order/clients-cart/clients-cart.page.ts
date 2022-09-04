import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-clients-cart',
  templateUrl: './clients-cart.page.html',
  styleUrls: ['./clients-cart.page.scss'],
})
export class ClientsCartPage implements OnInit {
  items: any = [];
  deliveryOption = false;
  vat:any ;
  session: any;
  ItemsLoaded: boolean = false;

  constructor(
    public popoverController: PopoverController,
    private tmpStorage: TemporaryStorage,
    private alertController: AlertController,
    private api: ApiService,
    private route: Router,
    private menu: MenuController,
  ) {}

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.session = this.tmpStorage.getSessioninfo();
    
    this.loadCart();
    this.ViewCart();
  }


  ViewCart() {
    let amount
   this.api.GetVAT().subscribe((res) =>{
    amount = res
    this.vat = amount.amount;
      console.log(this.vat);
    })
    
  }

  loadCart() {
    console.log(this.session[0].id)
    this.api.ClientCartItems(this.session[0].id).subscribe((res) => {
      this.items = res;
      console.log("Request Sent");
      
      console.log(this.items);
    });

    this.ItemsLoaded = true
  }

  increment(item) {
    // the quantity and price and get new subtotal
    item.quantity += 1;
    this.api.ClientIncreaseCartItem(item.id).subscribe((res) => {
      console.log(res.body);
    });
  }

  decrement(item) {
    // the quantity and price and get new subtotal
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.api.ClientDecreaseCartItem(item.id).subscribe((res) => {
        console.log(res.body);
      });
    }
  }

  RemoveFromCart(item) {
    this.api.ClientRemoveFromCart(item.id).subscribe((res) => {
      console.log(res.body);
      this.loadCart();
    });

  }

  ClearCart() {
    this.api.ClientClearCart(this.items[0].cartId).subscribe((res) =>{
      console.log(res.body);
      //this.loadCart();
    });
    this.items.length = 0
 
  }



  //Calculations
  get Subtotal() {
    return this.items.reduce(
      (sum, x) => ({
        quantity: 1,
        price: sum.price + x.quantity * x.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  get CalculatedVAT() {
    return this.vat * this.Subtotal;
  }

  get OrderTotal() {
    if (this.deliveryOption == true) {
      return this.Subtotal + 200;
    } else {
      return this.Subtotal;
    }
  }

  get TotalItems() {
    return this.items.length;
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Thank You For Your Order!',
      message:
        'At SAiCS we know the struggles many of us face everyday and that is why we are offering you the opportunity to take control of your health and start living a healthy and maintable lifestyle with our top of the range and clinically tested products!',
      cssClass: 'ThankYouAlert',
      buttons: [
        {
          text: 'Back to home',
        },
      ],
    });
    await alert.present();
  }

  //Place order
  PlaceOrder() {
    var orderdetails = {
      itemCount: this.TotalItems,
      vat: this.CalculatedVAT,
      subtotal: this.Subtotal,
      totalCost: this.OrderTotal,
      deliveryOption: this.deliveryOption,
    };
    localStorage.setItem('checkout', JSON.stringify(orderdetails));

    this.route.navigate(['client-checkout']);
  }
}
