import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { CartService } from '../Services/cart.service';
import { TemporaryStorage } from '../Services/TemporaryStorage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items: any = [];
  deliveryOption = false;
  vat:any ;
  session: any;
  deliveryArr: any;
  SelectedDel;
  OdrSmry: any;
  ItemsLoaded: boolean = false;
  imageArray: any = [];
  data: any = []
  @ViewChildren('itemTotalSpan') itemTotal: QueryList<ElementRef>;

  constructor(
    private tmpStorage: TemporaryStorage,
    private api: ApiService,
    public cartService: CartService,
    private router: Router
  ) {}

  ionViewWillEnter () {
    this.session = this.tmpStorage.getSessioninfo();
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.CheckStandAlone()
    this.ViewCart();
    this.GetMerchImage()
    this.cartService.getCartTotalQty();
    this.cartService.totalPrice();
  }

  ViewCart() {
    let amount
   this.api.GetVAT().subscribe((res) =>{
    amount = res
    this.vat = amount.amount;
      console.log(this.vat);
    })
    
    let data 
    this.api.GetUserDeliveryTypes().subscribe((res) =>{
      data = res
      this.deliveryArr = data
      this.SelectedDel = this.deliveryArr[0].id
      })
    
  }

  GetMerchImage()
  {
    this.imageArray = new Array(this.items.length).fill(null)

    this.items.forEach((obj: any) => {
      let index = this.items.findIndex(x => x.id == obj.id);

      if(obj.spId)
      {
        this.api.GetSpImage(obj.spId).subscribe((baseImage: any) => {
          this.imageArray[index] = { id: obj.id, name: obj.name, image: baseImage.image };
        });
      }
      else
      {
        this.api.GetMerchImage(obj.id).subscribe((baseImage: any) =>{
          this.imageArray[index] = { id: obj.id, name: obj.name, image: baseImage.image };
        })
      }
    })
  }

  LoadImage(name: string) {
    return this.imageArray.find((x) => x?.name === name)?.image;
  }

  CheckStandAlone()
  {
    
    this.api.CheckStandAlone().subscribe((res)=>{
     // console.log(res);
      this.data = res
      
      this.items.forEach((e: any) =>{
      const sp = this.data.find(x => x.id === e.id)?.price

      if(sp)
      {
        e.price = sp
      }
       
      })
    })
    //console.log(this.items);
    
  }

  RemoveFromCart(item) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  decrement(item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.saveCart();
      var i = this.items.findIndex((x) => x.id === item.id);
      //this.ChangeItemTotal(item, i);
    }
  }

  increment(item) {
    item.quantity += 1;
    this.cartService.saveCart();
    var i = this.items.findIndex((x) => x.id === item.id);
    //this.ChangeItemTotal(item, i);
  }

  ClearCart() {
    this.cartService.clearCart()
    this.items.length = 0
 
  }

   //Calculations

  //  ChangeItemTotal(item, index) {
  //   const subTotal = item.price * item.quantity;
  //   this.itemTotal.toArray()[index].nativeElement.innerHTML = subTotal;
  //   this.cartService.saveCart();
  // }

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
    
    const sp = this.deliveryArr.find(x => x.id === parseInt(this.SelectedDel))?.price 
      return this.Subtotal + parseInt(sp);
    } else {
      return this.Subtotal;
    }
  }

  get TotalItems() {
    return this.items.length;
  }
 

  //Place order
  PlaceOrder() {

    var orderdetails = {
      itemCount: this.TotalItems,
      vat: this.CalculatedVAT,
      vatPercentage: this.vat,
      subtotal: this.Subtotal,
      totalCost: this.OrderTotal,
      deliveryOption: false,
      delveryId: null,
      addressId: null
    };
    localStorage.setItem('checkout', JSON.stringify(orderdetails));
    
    this.router.navigate(['/tabs/tab2/checkout']);
  }

}
