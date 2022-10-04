import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-special-item',
  templateUrl: './special-item.page.html',
  styleUrls: ['./special-item.page.scss'],
})
export class SpecialItemPage implements OnInit {
  Item: any;
  ItemFeedback: any = [];
  ItemId: any;
  ItemQuantity = 0;
  session: any;
  public setBorderColor: boolean = false;
  username;
  DesRev: string = 'description';

  constructor(
    private api: ApiService,
    private tmpStorage: TemporaryStorage,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.ItemId = JSON.parse(localStorage.getItem('CatalogItem'));
    this.session = this.tmpStorage.getSessioninfo();
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
          isStandAlone: this.Item.categoryName != "Stand Alone"? false : null,
          spId: this.Item.id 
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
    var data = await this.api.UserSpecialItem(id).toPromise();
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

  Back() {
    localStorage.removeItem('CatalogItem')
    history.back();
  }

  ChooseOption(option: string)
  {
     this.DesRev = option;
  }

}
