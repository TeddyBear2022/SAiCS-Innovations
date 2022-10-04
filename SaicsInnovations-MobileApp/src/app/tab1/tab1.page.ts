import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';
import { ApiService } from '../Services/api.service';
import { CartService } from '../Services/cart.service';
import { TemporaryStorage } from '../Services/TemporaryStorage.service';
import { IonSelect  } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public setBorderColor: boolean = false;
  merchandise = [];
  session: any;
  selectedItem;
  filterKeys = ['name', 'catID', 'type'];
  search;
  categorysearch;
  username
  imageArray: any = [];
  @ViewChild('mySelect') selectRef: IonSelect;
  showList = true;

  constructor(
    private api: ApiService,
    private route: Router,
    private tmpStorage: TemporaryStorage,
    private cartService: CartService
  ) {}


  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo();
    this.GetCatalog();
    this.username = localStorage.getItem('UserName')
  }

  OpenSelect()
  {
    this.selectRef.open()
  }


  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }

  async GetCatalog() {
    var data = await this.api.ViewCatalog().toPromise();
    var dataObj = JSON.parse(JSON.stringify(data));
    this.merchandise = dataObj;
    console.log(this.merchandise);
    this.imageArray = new Array(this.merchandise.length).fill(null);
      //console.log(this.imageArray);

      this.merchandise.forEach((obj: any) => {
        let index = this.merchandise.findIndex((x) => x.id == obj.id);

        this.api.GetMerchImage(obj.id).subscribe((baseImage: any) => {
          this.imageArray[index] = { id: obj.id, image: baseImage.image };
        });
      });
  }

  GetMerchImage(id: number) {
    return this.imageArray.find((x) => x?.id === id)?.image;
  }
  
  AddToCart(id) {
    var item = this.merchandise.find((x) => x.id === id);
    if (item.quantity > 0) {
      if (!this.cartService.itemInCart(item)) {
        //for storage
        var addItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          isStandAlone: true,
          spId: item.spId?? null
        };
        console.log(addItem);
        this.cartService.addToCart(addItem);
      }
      item.quantity = 0;
    } else {
      console.log('Inavlid Form');
      this.setBorderColor = true;
      this.selectedItem = item.id;
    }
  }

  incrementQty(index: number) {
    this.merchandise[index].quantity += 1;

    if (this.merchandise[index].quantity == 0) {
      this.setBorderColor = true;
      this.merchandise[index].id;
    } else {
      this.setBorderColor = false;
      this.merchandise[index].id;
    }
  }

  decrementQty(index: number) {
    if (this.merchandise[index].quantity > 0)
      this.merchandise[index].quantity -= 1;

    if (this.merchandise[index].quantity == 0) {
      this.setBorderColor = true;
      this.merchandise[index].id;
    } else {
      this.setBorderColor = false;
      this.merchandise[index].id;
    }
  }

  ViewCart() {
    console.log('cart');
    this.route.navigate(['clients-cart']);
  }

  ViewItem(id: number) {
    localStorage.setItem('CatalogItem', JSON.stringify(id));
    this.route.navigate(['/item-details']);
  }
}
