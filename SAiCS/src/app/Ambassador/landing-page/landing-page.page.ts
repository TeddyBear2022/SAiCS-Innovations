import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';;
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  cartImages = []
  merchandise = []
  

  constructor(
  public popoverController: PopoverController, 
  private api: ApiService, private cartService: CartService, private fb: FormBuilder,public router: Router){}
  
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

AddToCart(item)
{
    
    // var itemImage: any = {}
  if(!this.cartService.itemInCart(item))
  {
    //for storage 
    var addItem = {'id':item.id, 'name': item.name, 'price': item.price,  'quantity': item.quantity} 
    console.log(addItem);
    this.cartService.addToCart(addItem);
 }
//  let newItem = {} as CartItem
//  newItem.packageId = item.itemType === 2? item.itemID : null
//  newItem.productId = item.itemType === 1? item.itemID : null
//  newItem.specialId = null
//  newItem.price = item.itemPrice
//  newItem.quantity = item.itemQuantity

//  let cartvm = {} as CartVM 
//  cartvm.userID = 1 //use session storage
//  cartvm.cartItem = newItem
 
// this.api.AddToCart(cartvm).subscribe((res) => {
//   console.log(res);
//   var marked = {'cartItem': res, 'type': item.itemType, 'Id': item.itemID}
//   localStorage.setItem('MarkedItem',JSON.stringify(marked))
// });

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
  this.cartService.SetImage = merchandise
  this.router.navigate(['/view-ambassador-cart'])
}
}
