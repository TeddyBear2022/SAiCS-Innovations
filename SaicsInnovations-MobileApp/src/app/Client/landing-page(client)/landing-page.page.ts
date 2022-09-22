import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { CartVM } from 'src/app/Models/ViewModels/CartVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  
  products: any
  ItemQuantity: FormGroup
  inputValue: number  = 1
  session=[]

  constructor(
  public popoverController: PopoverController, 
  private api: ApiService, private fb: FormBuilder,
  private route:Router,
  private tmpStorage:TemporaryStorage,
  private menu:MenuController){}
  
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }


  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    // this.menu.open('client-menu')
    // this.menu.close()
    this.GetCatalog()

    this.ItemQuantity = this.fb.group({
      quantity: new FormControl('', Validators.required)
    })
    this.session = this.tmpStorage.getSessioninfo()
  }


 async GetCatalog()
{

var data = await this.api.ViewCatalog().toPromise()
var dataObj = JSON.parse(JSON.stringify(data));
this.products = dataObj
console.log(this.products)
}

AddToCart(item: any)
{

//  let newItem = {} as CartItem
//  newItem.packageId = item.itemType === 2? item.itemID : null
//  newItem.productId = item.itemType === 1? item.itemID : null
//  newItem.specialId = null
//  newItem.price = item.itemPrice
//  newItem.quantity = item.itemQuantity

//  let cartvm = {} as CartVM 
//  cartvm.userID = this.session[0].id //use session storage
//  cartvm.cartItem = newItem
 
// this.api.AddToCart(cartvm).subscribe((res) => {
//   console.log(res);
//   var marked = {'cartItem': res, 'type': item.itemType, 'Id': item.itemID}
//   localStorage.setItem('MarkedItem',JSON.stringify(marked))
// });

 //console.log(cartvm)
}

incrementQty(index: number) {
  this.products[index].itemQuantity += 1;
}

decrementQty(index: number) {
  if(this.products[index].itemQuantity >  0)
  this.products[index].itemQuantity -= 1;
}

ViewCart(){
  console.log("cart");
  
this.route.navigate(['clients-cart'])
}

}
