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
  selector: 'app-client-special',
  templateUrl: './client-special.page.html',
  styleUrls: ['./client-special.page.scss'],
})
export class ClientSpecialPage implements OnInit {
  public setBorderColor: boolean = false;
  merchandise: any = [];
  session: any;
  ItemQuantity: FormGroup;
  imageArray: any = [];
  selectedItem;
  filterKeys = ['name', 'typeId'];
  search;
  categorysearch;
  specialTypes: any = [];
  username;

  constructor(
    public popoverController: PopoverController,
    private api: ApiService,
    public router: Router,
    private tmpStorage: TemporaryStorage,
    private menu: MenuController,
    private fb: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo();
    this.GetCatalog();
    this.menu.enable(true, 'client-menu');

    this.ItemQuantity = this.fb.group({
      quantity: new FormControl('', Validators.required),
    });
    this.username = localStorage.getItem('UserName');
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }

  async GetCatalog() {
    this.api.ViewCatelogSpecials().subscribe((data) => {
      this.merchandise = data;
      console.log(this.merchandise);
      this.imageArray = new Array(this.merchandise.length).fill(null);
      //console.log(this.imageArray);

      this.merchandise.forEach((obj: any) => {
        let index = this.merchandise.findIndex((x) => x.id == obj.id);

        this.api.GetSpImage(obj.id).subscribe((baseImage: any) => {
          this.imageArray[index] = { id: obj.id, image: baseImage.image };
        });
      });
    });

    this.api.GetSpecialTypes().subscribe((res) => {
      this.specialTypes = res;
      //console.log(this.specials);
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
          isStandAlone: item.categoryName != "Stand Alone"? false : null,
          spId: item.id 
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

  ViewItem(id: number) {
    localStorage.setItem('SpecialItem', JSON.stringify(id));
    this.router.navigate(['./client-special-item']);
  }

  // Show Profile optionss when icon on right of navbar clicked function
  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
