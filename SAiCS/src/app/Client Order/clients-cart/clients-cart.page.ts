import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
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
  @ViewChildren('itemTotalSpan') itemTotal: QueryList<ElementRef>;
  imageArray: any = [];

  constructor(
    public popoverController: PopoverController,
    private tmpStorage: TemporaryStorage,
    private alertController: AlertController,
    private api: ApiService,
    private route: Router,
    private menu: MenuController,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.session = this.tmpStorage.getSessioninfo();
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.GetMerchImage()
    this.ViewCart();
  }

  ionViewDidLoad() {
    this.GetMerchImage()
  }

  ViewCart() {
    let amount
   this.api.GetVAT().subscribe((res) =>{
    amount = res
    this.vat = amount.amount;
      console.log(this.vat);
    })
    
  }

  GetMerchImage()
  {
    this.imageArray = new Array(this.items.length).fill(null);
    console.log(this.imageArray);

    this.items.forEach((obj: any) => {
      let index = this.items.findIndex(x => x.id == obj.id);
    console.log(`index: ${index}`);

      this.api.GetMerchImage(obj.id).subscribe((baseImage: any) =>{
        //console.log(baseImage.image);
        this.imageArray[index] = baseImage.image
      })
    })
  }

  // loadCart() {
  //   console.log(this.session[0].id)
  //   this.api.ClientCartItems(this.session[0].id).subscribe((res) => {
  //     this.items = res;
  //     console.log("Request Sent");
      
  //     console.log(this.items);
  //   });

  //   this.ItemsLoaded = true
  // }

  increment(item) {
    // the quantity and price and get new subtotal
    // item.quantity += 1;
    // this.api.ClientIncreaseCartItem(item.id).subscribe((res) => {
    //   console.log(res.body);
    // });

    item.quantity += 1;
    this.cartService.saveCart();
    var i = this.items.findIndex((x) => x.id === item.id);
    this.ChangeItemTotal(item, i);
  }

  decrement(item) {
    // the quantity and price and get new subtotal
    // if (item.quantity > 1) {
    //   item.quantity -= 1;
    //   this.api.ClientDecreaseCartItem(item.id).subscribe((res) => {
    //     console.log(res.body);
    //   });
    // }
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.saveCart();
      var i = this.items.findIndex((x) => x.id === item.id);
      this.ChangeItemTotal(item, i);
    }
  }

  RemoveFromCart(item) {
    // this.api.ClientRemoveFromCart(item.id).subscribe((res) => {
    //   console.log(res.body);
    //   this.loadCart();
    // });
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  ClearCart() {
    // this.api.ClientClearCart(this.items[0].cartId).subscribe((res) =>{
    //   console.log(res.body);
    //   this.loadCart();
    // });
    this.cartService.clearCart()
    this.items.length = 0
 
  }



  //Calculations

  ChangeItemTotal(item, index) {
    const subTotal = item.price * item.quantity;
    this.itemTotal.toArray()[index].nativeElement.innerHTML = subTotal;
    this.cartService.saveCart();
  }

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

    var pushToCart = []
    for(let item of this.items)
    {
      let cart = {} as CartItem
      cart.merchandiseId = item.id
      cart.quantity = item.quantity
      cart.price = item.price
      pushToCart.push(cart)
    }

    pushToCart.forEach(e =>{
      this.api.ClientAddToCart(this.session[0].id, e).subscribe((res) => {
        console.log(res.body);
      });
    })
    
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
