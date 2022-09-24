import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CartItem } from 'src/app/Models/CartItem';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  Item: any;
  ItemFeedback: any = [];
  ItemId: any;
  ItemQuantity = 0;
  session: any;
  public setBorderColor: boolean = false;
  username;
  

  // Products: Product[]
  constructor(
    public popoverController: PopoverController,
    private api: ApiService,
    private tmpStorage:TemporaryStorage,
    private menu: MenuController,
    private cartService: CartService,
  ) {
    this.ItemId = JSON.parse(localStorage.getItem('CatalogItem'));
  }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.session = this.tmpStorage.getSessioninfo()
    this.GetItem(this.ItemId);
    this.username = localStorage.getItem('UserName');
  }

  ionViewDidLoad() {
    this.GetItem(this.ItemId);
    this.setBorderColor = false;
  }


  AddToCart() {
    if (this.Item.quantity > 0) {
      this.setBorderColor = false;
      if (!this.cartService.itemInCart(this.Item)) {
        //for storage
        var addItem = {
          id: this.Item.id,
          name: this.Item.name,
          price: this.Item.price,
          quantity: this.Item.quantity,
          isStandAlone: true,
          spId: this.Item.spId?? null
        };
        console.log(addItem);
        this.cartService.addToCart(addItem);
      }
      this.Item.quantity = 0;
    } else {
      this.setBorderColor = true;
    }
  }

  async GetItem(id: number) {
    var data = await this.api.ViewCatalogItem(id).toPromise();
    var dataObj = JSON.parse(JSON.stringify(data));
    this.Item = dataObj;
    this.ItemFeedback = this.Item.feedback;
    console.log(this.Item);
  }

  
  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }

  transform(event) {
    if (this.Item.quantity > 0) this.setBorderColor = false;
    else this.setBorderColor = true;
  }

  Return() {
    localStorage.removeItem('CatalogItem')
    history.back();
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
