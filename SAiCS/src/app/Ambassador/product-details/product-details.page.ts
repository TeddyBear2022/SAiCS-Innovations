import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CartItem } from 'src/app/Models/CartItem';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  Item: any;
  ItemFeedback: any;
  ItemId: any;
  ItemQuantity = 0;
  session: any;

  // Products: Product[]
  constructor(
    public popoverController: PopoverController,
    private api: ApiService,
    private tmpStorage:TemporaryStorage,
    private menu: MenuController,
  ) {
    this.ItemId = JSON.parse(localStorage.getItem('CatalogItem'));
  }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.session = this.tmpStorage.getSessioninfo()
    this.GetItem(this.ItemId);
  }



  AddToCart() {
    if (this.ItemQuantity > 0) {
      let newItem = {} as CartItem;
      newItem.merchandiseId = this.ItemId;
      newItem.price = this.Item.price;
      newItem.quantity = this.ItemQuantity;

      this.api.AddToCart(this.session[0].id, newItem).subscribe((res) => {
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
