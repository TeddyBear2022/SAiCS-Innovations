import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {  Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-view-ambassador-cart',
  templateUrl: './view-ambassador-cart.page.html',
  styleUrls: ['./view-ambassador-cart.page.scss'],
})
export class ViewAmbassadorCartPage implements OnInit {
  items: any = [];
  deliveryOption = false;
  discount = 0;
  vat = 0;
  session: any 
  @ViewChildren('itemTotalSpan') itemTotal: QueryList<ElementRef>;
  imageArray: any = [];

  constructor(
    private api: ApiService,
    private tmpStorage:TemporaryStorage,
    private router: Router,
    private cartService: CartService,
    private menu: MenuController,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo()
    this.menu.enable(true, 'ambassador-menu');
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.GetMerchImage()
    //this.loadCart();
    this.ViewCart();
    
  }

  ionViewDidLoad() {
    this.GetMerchImage()
  }


  async ViewCart() {
    var data = await this.api.AmbassadorDiscount(this.session[0].id).toPromise();
    var dataObj = JSON.parse(JSON.stringify(data[0].discount));
    this.discount = dataObj;
    console.log(`discount: ${this.discount}`);
    
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

  // loadCart()
  // {
  //     this.api.GetCartItems(this.session[0].id).subscribe(res =>{
  //       this.items = res
  //       console.log(this.items);
        
  //     })
    
  // }

  increment(item) {
    // the quantity and price and get new subtotal
    // item.quantity += 1;
    // this.api.IncreaseCartItem(item.id).subscribe((res) => {
    //   console.log(res.body);
      
    // })
    item.quantity += 1;
    this.cartService.saveCart();
    var i = this.items.findIndex((x) => x.id === item.id);
    this.ChangeItemTotal(item, i);
  }

  decrement(item) {
    // the quantity and price and get new subtotal
    // if (item.quantity > 1) {
    //   item.quantity -= 1;
    //   this.api.DecreaseCartItem(item.id).subscribe((res) =>{
    //     console.log(res.body);
        
    //   })
    // }

    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.saveCart();
      var i = this.items.findIndex((x) => x.id === item.id);
      this.ChangeItemTotal(item, i);
    }
  }

  RemoveFromCart(item) {
    // this.api.RemoveFromCart(item.id).subscribe(res =>{
    //   console.log(res.body);
    //   this.loadCart();
    // })

    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  ClearCart() {
    // this.api.ClearCart(this.items[0].cartId).subscribe();
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

 get AmbassadorDiscount() {
    return  this.Subtotal * this.discount
  }

  get CalculatedVAT()
  {
    return this.vat * this.Subtotal
  }

  get OrderTotal()
  {
    if(this.deliveryOption == true)
    {
      return (this.Subtotal + 200) - this.AmbassadorDiscount
    }
    else{
      return this.Subtotal - this.AmbassadorDiscount
    }
    
  }

  get TotalItems()
  {
    return this.items.length
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
      this.api.AddToCart(this.session[0].id, e).subscribe((res) => {
        console.log(res.body);
      });
    })

    var orderdetails = {
      'itemCount': this.TotalItems, 'discount': this.AmbassadorDiscount,
      'vat': this.CalculatedVAT, 'subtotal': this.Subtotal, 'totalCost': this.OrderTotal, 'deliveryOption': this.deliveryOption}
      localStorage.setItem('checkout', JSON.stringify(orderdetails))
      
      this.router.navigate(['/ambassador-checkout-ii'])
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
