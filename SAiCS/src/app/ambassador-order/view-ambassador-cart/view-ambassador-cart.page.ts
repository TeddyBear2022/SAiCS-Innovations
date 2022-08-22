import {
  Component,
  OnInit
} from '@angular/core';
import {  Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';

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

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ViewCart();
    this.loadCart();
  }



  async ViewCart() {
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

  loadCart()
  {
    let one = 1 
    this.api.GetCartItems(one.toString()).subscribe(res =>{
      this.items = res
      console.log(this.items);
      
    })
  }

  increment(item) {
    // the quantity and price and get new subtotal
    item.quantity += 1;
    this.api.IncreaseCartItem(item.id).subscribe((res) => {
      console.log(res.body);
      
    })
  }

  decrement(item) {
    // the quantity and price and get new subtotal
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.api.DecreaseCartItem(item.id).subscribe((res) =>{
        console.log(res.body);
        
      })
    }
  }

  RemoveFromCart(item) {
    this.api.RemoveFromCart(item.id).subscribe(res =>{
      console.log(res.body);
      
    })
  }

  ClearCart() {
    this.api.ClearCart(this.items[0].cartId).subscribe();
    window.location.reload();
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
    var orderdetails = {
      'itemCount': this.TotalItems, 'discount': this.AmbassadorDiscount,
      'vat': this.CalculatedVAT, 'subtotal': this.Subtotal, 'totalCost': this.OrderTotal, 'deliveryOption': this.deliveryOption}
      localStorage.setItem('checkout', JSON.stringify(orderdetails))

    this.router.navigate(['/ambassador-checkout-ii'])
  }
}
