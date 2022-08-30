import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartItem } from 'src/app/Models/CartItem';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  merchandise = []
  

  constructor(
  public popoverController: PopoverController, 
  private api: ApiService,public router: Router){}
  
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ngOnInit() {
    this.GetCatalog()
  }


 async GetCatalog()
{
var data = await this.api.GetAllMerch().toPromise()
var dataObj = JSON.parse(JSON.stringify(data));
this.merchandise = dataObj;
console.log(this.merchandise);

}

AddToCart(id)
{
    
var item = this.merchandise.find(x => x.id === id)
    // var itemImage: any = {}
//   if(!this.cartService.itemInCart(item))
//   {
//     //for storage 
//     var addItem = {'id':item.id, 'name': item.name, 'price': item.price,  'quantity': item.quantity} 
//     console.log(addItem);
//     this.cartService.addToCart(addItem);
//  }
 let newItem = {} as CartItem
 newItem.merchandiseId = item.id 
 newItem.specialId = null
 newItem.price = item.price
 newItem.quantity = item.quantity
 
let one = 2 

this.api.AddToCart(one.toString(), newItem).subscribe((res) => {console.log(res.body);});

//  console.log(newItem)
}

incrementQty(index: number) {
  this.merchandise[index].quantity += 1;
  
}

decrementQty(index: number) {
  if(this.merchandise[index].quantity >  0)
  this.merchandise[index].quantity -= 1;
}

viewCart(merchandise)
{
  this.router.navigate(['/view-ambassador-cart'])
}
}
