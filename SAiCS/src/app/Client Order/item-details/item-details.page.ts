import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MenuController, PopoverController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
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

  constructor(
    public popoverController: PopoverController,
    private api: ApiService,
    private menu: MenuController,
    private tmpStorage: TemporaryStorage,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.ItemId = JSON.parse(localStorage.getItem('CatalogItem'));
    this.session = this.tmpStorage.getSessioninfo();
    this.menu.enable(true, 'client-menu');
    this.GetItem(this.ItemId);
  }

  AddToCart() {
    if (this.ItemQuantity > 0) {
      let newItem = {} as CartItem;
      newItem.merchandiseId = this.ItemId;
      newItem.specialId = null;
      newItem.price = this.Item.price;
      newItem.quantity = this.ItemQuantity;

      this.api.ClientAddToCart(this.session[0].id, newItem).subscribe((res) => {
        console.log(res.body);
      });
    }
  }

  async GetItem(id: number) {
    var data = await this.api.ViewCatalogItem(id).toPromise();
    var dataObj = JSON.parse(JSON.stringify(data));
    this.Item = dataObj;
    this.ItemFeedback = this.Item.feedback;
    console.log(this.Item);
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
