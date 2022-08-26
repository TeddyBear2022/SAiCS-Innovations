import { CurrencyPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { share } from 'rxjs/operators';
import { CartItem } from 'src/app/Models/CartItem';

@Component({
  selector: 'app-view-ambassador-cart',
  templateUrl: './view-ambassador-cart.page.html',
  styleUrls: ['./view-ambassador-cart.page.scss'],
})
export class ViewAmbassadorCartPage implements OnInit {
  cartImages: any;
  items = [];
  deliveryOption = false;
  //For totals to reflect
  @ViewChildren('itemTotalSpan') itemTotal: QueryList<ElementRef>;
 
 
  discount = 0;
  vat = 0;

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cartImages = this.cartService.GetImage;
  }

  ngOnInit() {
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.ViewCart();
  }

  //Cart funtionalities

  getImage(id) {
    var image = this.cartImages.find((x) => x.id === id);
    if (image) {
      return `data:image/png;base64,${image.image}`;
    } else {
      return './assets/noImage.png';
    }
  }

  async ViewCart() {
    var data = await this.api.AmbassadorDiscount(2).toPromise();
    var dataObj = JSON.parse(JSON.stringify(data[0].discount));
    this.discount = dataObj;
    console.log(`discount: ${this.discount}`);
    
    var vatData = await this.api.GetVAT().toPromise();
    var vatObj = JSON.parse(JSON.stringify(vatData));
    this.vat = vatObj;
    console.log(`discount: ${this.vat}`);
  }

  increment(item) {
    // the quantity and price and get new subtotal
    item.quantity += 1;
    this.cartService.saveCart();
    var i = this.items.findIndex((x) => x.id === item.id);
    this.ChangeItemTotal(item, i);
  }

  decrement(item) {
    // the quantity and price and get new subtotal
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.saveCart();
      var i = this.items.findIndex((x) => x.id === item.id);
      this.ChangeItemTotal(item, i);
    }
  }

  RemoveFromCart(item) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  ClearCart(id: number) {
    this.api.ClearCart(id).subscribe();
    window.location.reload();
  }

  ChangeItemTotal(item, index) {
    const subTotal = item.price * item.quantity;
    this.itemTotal.toArray()[index].nativeElement.innerHTML = subTotal;
    this.cartService.saveCart();
  }

//Calculations
  get total() {
    return this.items.reduce(
      (sum, x) => ({
        quantity: 1,
        price: sum.price + x.quantity * x.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

 get AmbassadorDiscount() {
    return  this.total * this.discount
    //return "hello"
  }

  get CalculatedVAT()
  {
    return this.vat * this.total
  }

  get OrderTotal()
  {
    if(this.deliveryOption == true)
    {
      return (this.total + 200) - this.AmbassadorDiscount
    }
    else{
      return this.total - this.AmbassadorDiscount
    }
    
  }

  get TotalItems()
  {
    return this.items.length
  }

  //Place order
  PlaceOrder() {
    var itemArray = []
    for(let item of this.items)
    {
      let cart = {} as CartItem
      cart.merchandiseId = item.id
      cart.quantity = item.quantity
      cart.specialId = null
      itemArray.push(cart)
    }
    console.log(itemArray);
    
    var one = 1   
    this.api.AddToCart(one.toString(), itemArray).subscribe();

    var orderdetails = {
      'itemCount': this.TotalItems, 'discount': this.AmbassadorDiscount,
      'vat': this.CalculatedVAT, 'subtotal': this.total, 'totalCost': this.OrderTotal, 'deliveryOption': this.deliveryOption}
      localStorage.setItem('checkout', JSON.stringify(orderdetails))

    this.router.navigate(['/ambassador-checkout-ii'])
  }
}
