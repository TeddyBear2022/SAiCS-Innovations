import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  MenuController,
  PopoverController,
} from '@ionic/angular';
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
  vat: any;
  session: any;
  deliveryArr: any;
  SelectedDel;
  ItemsLoaded: boolean = false;
  @ViewChildren('itemTotalSpan') itemTotal: QueryList<ElementRef>;
  imageArray: any = [];
  data: any = [];
  discount: any;
  username;

  constructor(
    public popoverController: PopoverController,
    private tmpStorage: TemporaryStorage,
    private alertController: AlertController,
    private api: ApiService,
    private router: Router,
    private menu: MenuController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo();
    this.menu.enable(true, 'ambassador-menu');
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.GetMerchImage();
    this.ViewCart();
    this.username = localStorage.getItem('UserName');
  }

  ionViewDidLoad() {
    this.GetMerchImage();
  }

  async ViewCart() {
    var data = await this.api
      .AmbassadorDiscount(this.session[0].id)
      .toPromise();
    var dataObj = JSON.parse(JSON.stringify(data[0].discount));
    this.discount = dataObj;
    console.log(`discount: ${this.discount}`);

    let amount;
    this.api.GetVAT().subscribe((res) => {
      amount = res;
      this.vat = amount.amount;
      console.log(this.vat);
    });

    let del;
    this.api.GetUserDeliveryTypes().subscribe((res) => {
      del = res;
      this.deliveryArr = del;
      this.SelectedDel = this.deliveryArr[0].id;
    });
  }

  CheckStandAlone() {
    this.api.CheckStandAlone().subscribe((res) => {
      // console.log(res);
      this.data = res;

      this.items.forEach((e: any) => {
        const sp = this.data.find((x) => x.id === e.id)?.price;

        if (sp) {
          e.price = sp;
        }
      });
    });
    //console.log(this.items);
  }

  GetMerchImage() {
    this.imageArray = new Array(this.items.length).fill(null);

    this.items.forEach((obj: any) => {
      let index = this.items.findIndex((x) => x.id == obj.id);

      if (obj.spId) {
        this.api.GetSpImage(obj.spId).subscribe((baseImage: any) => {
          this.imageArray[index] = {
            id: obj.id,
            name: obj.name,
            image: baseImage.image,
          };
        });
      } else {
        this.api.GetMerchImage(obj.id).subscribe((baseImage: any) => {
          this.imageArray[index] = {
            id: obj.id,
            name: obj.name,
            image: baseImage.image,
          };
        });
      }
    });
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
    this.cartService.clearCart();
    this.items.length = 0;
  }

  onSelectChange(event) {
    let value = event.target.value;
    this.SelectedDel = value;
  }

  //CALCULATIONS

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
    return this.Subtotal * this.discount;
  }

  get CalculatedVAT() {
    return this.vat * this.Subtotal;
  }

  get OrderTotal() {
    if (this.deliveryOption == true) {
      const sp = this.deliveryArr.find(
        (x) => x.id === parseInt(this.SelectedDel)
      )?.price;
      return this.Subtotal + parseInt(sp) - this.AmbassadorDiscount;
    } else {
      return this.Subtotal - this.AmbassadorDiscount;
    }
  }

  get TotalItems() {
    return this.items.length;
  }

  //Place order
  PlaceOrder() {
    // var pushToCart = []
    // for(let item of this.items)
    // {
    //   let cart = {} as CartItem
    //   cart.merchandiseId = item.id
    //   cart.quantity = item.quantity
    //   cart.price = item.price
    //   pushToCart.push(cart)
    // }

    // pushToCart.forEach(e =>{
    //   this.api.AddToCart(this.session[0].id, e).subscribe((res) => {
    //     console.log(res.body);
    //   });
    // })

    var orderdetails = {
      itemCount: this.TotalItems,
      discount: this.AmbassadorDiscount,
      vat: this.CalculatedVAT,
      vatPercentage: this.vat,
      subtotal: this.Subtotal,
      totalCost: this.OrderTotal,
      deliveryOption: this.deliveryOption,
      delveryId: this.SelectedDel
    };
    localStorage.setItem('checkout', JSON.stringify(orderdetails));

    this.router.navigate(['/ambassador-checkout-ii']);
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
