import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  public setBorderColor: boolean = false;
  merchandise = []
  session: any 
  selectedItem;
  filterKeys = ['name', 'catID', 'type'];
  search;
  categorysearch;

  constructor(
  public popoverController: PopoverController, 
  private api: ApiService,
  private route:Router,
  private tmpStorage:TemporaryStorage,
  private menu:MenuController,
  private cartService: CartService){}
  
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }


  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo()
    this.menu.enable(true, 'client-menu');
    this.GetCatalog()
  }

  get TotalItems()
  {
   // this.cartService.getItems();
   this.cartService.loadCart();
    var cartItemCount = []
    cartItemCount =this.cartService.getItems();
    return cartItemCount.length
  }

 async GetCatalog()
{

  var data = await this.api.ViewCatalog().toPromise()
  var dataObj = JSON.parse(JSON.stringify(data));
  this.merchandise = dataObj;
  console.log(this.merchandise);
 

}

AddToCart(id)
{
    
var item = this.merchandise.find(x => x.id === id)
if (item.quantity > 0) {
//  let newItem = {} as CartItem
//  newItem.merchandiseId = item.id 
//  newItem.specialId = null
//  newItem.price = item.price
//  newItem.quantity = item.quantity

// this.api.ClientAddToCart(this.session[0].id, newItem).subscribe((res) => {console.log(res.body);});
// item.quantity = 0

if(!this.cartService.itemInCart(item))
      {
        //for storage 
        var addItem = {'id':item.id, 'name': item.name, 'price': item.price,  'quantity': item.quantity} 
        console.log(addItem);
        this.cartService.addToCart(addItem);
     }
      item.quantity = 0
} 
else 
{
  console.log('Inavlid Form');
  this.setBorderColor = true;
  this.selectedItem = item.id
    //div.style.borderColor = 'red';
   // div.style.border

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
  if(this.merchandise[index].quantity >  0)
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

ViewCart(){
  console.log("cart");
  
this.route.navigate(['clients-cart'])
}

ViewItem(id: number)
{
  localStorage.setItem('CatalogItem', JSON.stringify(id))
  this.route.navigate(['/item-details'])
}

// SelectByCategory(e)
// {
//   // let value = e.target.value
//   //this.api.ViewCatalog()
// console.log("vakue");

//   if(e == 5)
//   {
//     console.log(e);
    
//   }
//   else
//   {
//     this.api.ViewCatalog().subscribe((res) =>{
//       this.merchandise = this.merchandise.filter(x =>{
//         if(e = 4)
//         return x.typeID == e
//         else
//         return x.catID == e 
//       })
//     }) 
//   }
// }

}
