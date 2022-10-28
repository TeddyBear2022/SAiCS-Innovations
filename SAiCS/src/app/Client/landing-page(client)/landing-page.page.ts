import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  MenuController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
import { ContexthelpPage } from 'src/app/User/contexthelp/contexthelp.page';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  public setBorderColor: boolean = false;
  merchandise = [];
  session: any;
  selectedItem;
  filterKeys = ['name', 'catID', 'type'];
  search;
  categorysearch;
  username;
  imageArray: any = [];
  removeImage: any = [];

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: { delay: 4000 },
    loop: true,
  };

  constructor(
    public popoverController: PopoverController,
    private api: ApiService,
    private route: Router,
    private tmpStorage: TemporaryStorage,
    private menu: MenuController,
    private cartService: CartService,
    private modal: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading',
      duration: 3000,
      cssClass: 'custom-loading',
      spinner: 'lines',
    });
    
    loading.present();
    
  }


  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }

  ngOnInit() {
    
    this.session = this.tmpStorage.getSessioninfo();
    this.menu.enable(true, 'client-menu');
    this.GetCatalog();
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
    
    var data = await this.api.ViewCatalog().toPromise();
    var dataObj = JSON.parse(JSON.stringify(data));
    this.merchandise = dataObj;
    this.removeImage = this.merchandise.map((item)=>{
      return {id:item.id}})

    this.imageArray = new Array(this.merchandise.length).fill(null);
    if(this.imageArray.length > 0){this.showLoading()}
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

  onLoad(id: number){
    this.removeImage = this.removeImage.filter((x) => x?.id !== id);
    if(this.removeImage.length == 0)
    {
     this.loadingCtrl.dismiss()
    }
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
          spId: item.spId ?? null,
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

  let item = this.merchandise.find((x) => x?.id === index); 
  item.quantity += 1;

    if (item.quantity == 0) {
      this.setBorderColor = true;
      item.id;
    } else {
      this.setBorderColor = false;
      item.id;
    }

  }

  decrementQty(index: number) {
    let item = this.merchandise.find((x) => x?.id === index);

    if (item.quantity > 0)
     item.quantity -= 1;

    if (item.quantity == 0) {
      this.setBorderColor = true;
      item.id;
    } else {
      this.setBorderColor = false;
      item.id;
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

  async ContextHelp() {
    console.log('Open context help');
    const modal = await this.modal.create({
      component: ContexthelpPage,
      componentProps: { keyword: 'orders', type: 'Client' },
    });
    modal.onDidDismiss().then((info) => {});

    await modal.present();
  }
}
