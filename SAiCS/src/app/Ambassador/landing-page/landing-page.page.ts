import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartItem } from 'src/app/Models/CartItem';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  merchandise = [];
  products: any;
  ItemQuantity = 0;
  session: any;

  constructor(
    public popoverController: PopoverController,
    private api: ApiService,
    private tmpStorage: TemporaryStorage,
    private menu: MenuController,
    public router: Router,
  ) {}

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo();
    this.menu.enable(true, 'ambassador-menu');
    this.GetCatalog();
  }

  async GetCatalog() {
    var data = await this.api.ViewCatalog().toPromise();
    var dataObj = JSON.parse(JSON.stringify(data));
    this.merchandise = dataObj;
    console.log(this.merchandise);
  }

  public setBorderColor: boolean = false;
  selectedItem;
  AddToCart(id) {
    var item = this.merchandise.find((x) => x.id === id);
    if (item.quantity > 0) {
      let newItem = {} as CartItem;
      newItem.merchandiseId = item.id;
      newItem.price = item.price;
      newItem.quantity = item.quantity;

      this.api.AddToCart(this.session[0].id, newItem).subscribe((res) => {
        console.log(res.body);
      });
      item.quantity = 0
    } else {
      console.log('Inavlid Form');
      this.setBorderColor = true;
      this.selectedItem = item.id
    }
  }

  validateInput(input) {
    if (isNaN(input) || input.value < 0) {
      console.log(input);

      return (input = Math.abs(input));
    }
  }

  incrementQty(index: number) {
    this.merchandise[index].quantity += 1;

    if(this.merchandise[index].quantity == 0)
    {
    this.setBorderColor = true;
    this.merchandise[index].id
    }
    else
    {
      this.setBorderColor = false;
    this.merchandise[index].id
    }
  }

  decrementQty(index: number) {
    if (this.merchandise[index].quantity > 0)
      this.merchandise[index].quantity -= 1;

      if(this.merchandise[index].quantity == 0)
      {
      this.setBorderColor = true;
      this.merchandise[index].id
      }
      else
      {
        this.setBorderColor = false;
      this.merchandise[index].id
      }
  }

  viewCart(merchandise) {
    this.router.navigate(['/view-ambassador-cart']);
  }

  ViewItem(id: number)
{
  localStorage.setItem('CatalogItem', JSON.stringify(id))
  this.router.navigate(['/product-details'])
}

SelectByCategory(e)
{
  let value = e.target.value
  //this.api.ViewCatalog()
console.log("vakue");

  if(value == 5)
  {
    console.log(value);
    
  }
}
}
