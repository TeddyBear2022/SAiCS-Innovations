import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-ambassador-special',
  templateUrl: './ambassador-special.page.html',
  styleUrls: ['./ambassador-special.page.scss'],
})
export class AmbassadorSpecialPage implements OnInit {
  merchandise = []

  constructor(public popoverController: PopoverController, 
    private api: ApiService,public router: Router) { }

  ngOnInit() {
    this.GetCatalog()
  }

  async GetCatalog()
  {
  var data = await this.api.GetAllSpecials().toPromise()
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
 newItem.merchandiseId = item.specialCategory == 1? item.id : null
 newItem.specialId = item.specialCategory == 2? item.id : null
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

   // Show Profile optionss when icon on right of navbar clicked function
   async presentPopover(event)
   {
     const popover = await this.popoverController.create({
       component: ProfilePopoverComponent,
       event
     });
     return await popover.present();
   }

}
