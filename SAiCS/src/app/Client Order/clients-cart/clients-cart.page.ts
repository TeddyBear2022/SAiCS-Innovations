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
  deliveryArr: any;
  SelectedDel;
  ItemsLoaded: boolean = false;
  @ViewChildren('itemTotalSpan') itemTotal: QueryList<ElementRef>;
  imageArray: any = [];
  data: any = []
  username;

  constructor(
    public popoverController: PopoverController,
    private tmpStorage: TemporaryStorage,
    private alertController: AlertController,
    private api: ApiService,
    private route: Router,
    private menu: MenuController,
    private cartService: CartService,
  ) {
    
  }

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.session = this.tmpStorage.getSessioninfo();
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.GetMerchImage()
    this.CheckStandAlone()
    this.ViewCart();
    this.username = localStorage.getItem('UserName');
    
    
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
    
    let data 
    this.api.GetUserDeliveryTypes().subscribe((res) =>{
      data = res
      this.deliveryArr = data
      this.SelectedDel = this.deliveryArr[0].id
      })
    
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

  increment(item) {
    item.quantity += 1;
    this.cartService.saveCart();
    var i = this.items.findIndex((x) => x.id === item.id);
    this.ChangeItemTotal(item, i);
  }

  decrement(item) {
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

  ClearCart() {
    this.cartService.clearCart()
    this.items.length = 0
 
  }

  onSelectChange(event)
  {
    let value = event.target.value
    this.SelectedDel = value
    
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
    
    const sp = this.deliveryArr.find(x => x.id === parseInt(this.SelectedDel))?.price 
      return this.Subtotal + parseInt(sp);
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
      vatPercentage: this.vat,
      subtotal: this.Subtotal,
      totalCost: this.OrderTotal,
      deliveryOption: this.deliveryOption,
      delveryId: this.SelectedDel
    };
    localStorage.setItem('checkout', JSON.stringify(orderdetails));
    
    this.route.navigate(['client-checkout']);
  }

 
}
