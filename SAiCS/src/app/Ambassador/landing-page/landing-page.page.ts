import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  merchandise = [];
  session: any;
  public setBorderColor: boolean = false;
  selectedItem;
  filterKeys = ['name', 'catID', 'type'];
  search;
  categorysearch;
  username


  constructor(
    public popoverController: PopoverController,
    private api: ApiService,
    private tmpStorage: TemporaryStorage,
    private menu: MenuController,
    public router: Router,
    private cartService: CartService
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
    this.username = localStorage.getItem('UserName')
    
  }

  get TotalItems()
  {
   // this.cartService.getItems();
   this.cartService.loadCart();
    var cartItemCount = []
    cartItemCount =this.cartService.getItems();
    return cartItemCount.length
  }


  async GetCatalog() {
    var data = await this.api.ViewCatalog().toPromise();
    var dataObj = JSON.parse(JSON.stringify(data));
    this.merchandise = dataObj;
    console.log(this.merchandise);
  }



  AddToCart(id) {
    var item = this.merchandise.find((x) => x.id === id);
    if (item.quantity > 0) {
      // let newItem = {} as CartItem;
      // newItem.merchandiseId = item.id;
      // newItem.price = item.price;
      // newItem.quantity = item.quantity;

      // this.api.AddToCart(this.session[0].id, newItem).subscribe((res) => {
      //   console.log(res.body);
      // });

      if(!this.cartService.itemInCart(item))
      {
        //for storage 
        var addItem = {'id':item.id, 'name': item.name, 'price': item.price,  'quantity': item.quantity} 
        console.log(addItem);
        this.cartService.addToCart(addItem);
     }
      item.quantity = 0
    } else {
      console.log('Inavlid Form');
      this.setBorderColor = true;
      this.selectedItem = item.id
    }
  }

  // validateInput(input) {
  //   if (isNaN(input) || input.value < 0) {
  //     console.log(input);

  //     return (input = Math.abs(input));
  //   }
  // }

  incrementQty(index: number) {
    this.merchandise[index].quantity += 1;

    // if(this.merchandise[index].quantity == 0)
    // {
    // this.setBorderColor = true;
    // this.merchandise[index].id
    // }
    // else
    // {
    //   this.setBorderColor = false;
    //   this.merchandise[index].id
      
    // }
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

// get TotalItems()
// {
//   //this.cartService.loadCart();
//   var arr = []

//   arr = this.cartService.getItems()
//   return arr.length
// }

// SelectByCategory(e)
// {
//   let value = e.target.value
//   //this.api.ViewCatalog()
// console.log("vakue");

//   if(value == 5)
//   {
//     console.log(value);
    
//   }
// }
}
