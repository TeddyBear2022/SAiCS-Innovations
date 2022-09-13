import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  Item: any;
  ItemFeedback: any = [];
  ItemId: any;
  ItemQuantity = 0;
  session: any;
  public setBorderColor: boolean = false;

  constructor(
    public popoverController: PopoverController,
    private api: ApiService,
    private menu: MenuController,
    private tmpStorage: TemporaryStorage,
    private cartService: CartService,
    private route: Router,
  ) {}

  ngOnInit() {
    this.ItemId = JSON.parse(localStorage.getItem('CatalogItem'));
    this.session = this.tmpStorage.getSessioninfo();
    this.menu.enable(true, 'client-menu');
    this.GetItem(this.ItemId);
  }

  ionViewDidLoad() {
    this.GetItem(this.ItemId);
    this.setBorderColor = false;
  }

  AddToCart() {
    if (this.Item.quantity > 0) {
      // let newItem = {} as CartItem;
      // newItem.merchandiseId = this.ItemId;
      // newItem.specialId = null;
      // newItem.price = this.Item.price;
      // newItem.quantity = this.ItemQuantity;

      // this.api.ClientAddToCart(this.session[0].id, newItem).subscribe((res) => {
      //   console.log(res.body);
      // });

      this.setBorderColor = false;
      if(!this.cartService.itemInCart(this.Item))
      {
        //for storage 
        var addItem = {'id':this.Item.id, 'name': this.Item.name, 'price': this.Item.price,  'quantity': this.Item.quantity} 
        console.log(addItem);
        this.cartService.addToCart(addItem);
     }
     this.Item.quantity = 0

    }
    else
    {
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

  get TotalItems()
  {
   // this.cartService.getItems();
   this.cartService.loadCart();
    var cartItemCount = []
    cartItemCount =this.cartService.getItems();
    return cartItemCount.length
  }

  transform(event) {
    if (this.Item.quantity > 0)
    this.setBorderColor = false;
    else
    this.setBorderColor = true;
  }

  Return()
  {
    history.back()
    //localStorage.removeItem('CatalogItem')

   // this.route.navigate(['/landing-page'])  
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
