import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
import { ContexthelpPage } from 'src/app/User/contexthelp/contexthelp.page';

@Component({
  selector: 'app-ambassador-special',
  templateUrl: './ambassador-special.page.html',
  styleUrls: ['./ambassador-special.page.scss'],
})
export class AmbassadorSpecialPage implements OnInit {
  public setBorderColor: boolean = false;
  merchandise: any = [];
  session: any;
  ItemQuantity: FormGroup;
  imageArray: any = [];
  removeImage: any = [];
  selectedItem;
  filterKeys = ['name', 'typeId'];
  search;
  categorysearch;
  specialTypes: any = [];
  username;


  constructor(  public popoverController: PopoverController,
    private api: ApiService,
    public router: Router,
    private tmpStorage: TemporaryStorage,
    private menu: MenuController,
    private fb: FormBuilder,
    private cartService: CartService,
    private modal:ModalController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.session = this.tmpStorage.getSessioninfo()
    this.GetCatalog()
    this.ItemQuantity = this.fb.group({
      quantity: new FormControl('', Validators.required),
    });
    this.username = localStorage.getItem('UserName');
    
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading',
      cssClass: 'custom-loading',
      spinner: 'lines',
    });
    
    loading.present();
    
  }

  async GetCatalog() {
    this.api.ViewCatelogSpecials().subscribe((data) => {
      this.merchandise = data;
      this.removeImage = this.merchandise.map((item)=>{
        return {id:item.id}})
     // console.log(this.merchandise);
      this.imageArray = new Array(this.merchandise.length).fill(null);
      if(this.imageArray.length > 0){this.showLoading()}
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

  onLoad(id: number){
    this.removeImage = this.removeImage.filter((x) => x?.id !== id);
    if(this.removeImage.length == 0)
    {
     this.loadingCtrl.dismiss()
    }
 }
  
  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
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

  ViewItem(id: number) {
    localStorage.setItem('SpecialItem', JSON.stringify(id));
    this.router.navigate(['./ambassador-special-item']);
  }

   // Show Profile optionss when icon on right of navbar clicked function
   async presentPopover(event)
   {
     const popover = await this.popoverController.create({
       component: ProfilePopoverComponent,
       event
     });
     return await popover.present();
   }

   async ContextHelp(){
    console.log("Open context help");
    const modal = await this.modal.create({
      component: ContexthelpPage,
      componentProps:{keyword : "product", type: "Ambassador"}
    });
    modal.onDidDismiss().then((info) => {
      
    })
    
    await modal.present();
    
  }
}
