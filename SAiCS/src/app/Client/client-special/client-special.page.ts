import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-client-special',
  templateUrl: './client-special.page.html',
  styleUrls: ['./client-special.page.scss'],
})
export class ClientSpecialPage implements OnInit {
  merchandise = []
  session: any 
  ItemQuantity: FormGroup


  constructor(public popoverController: PopoverController, 
    private api: ApiService,public router: Router, private tmpStorage:TemporaryStorage,
    private menu:MenuController, private fb: FormBuilder) { }

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo()
    this.GetCatalog()
    this.menu.enable(true, 'client-menu');

    this.ItemQuantity = this.fb.group({
      quantity: new FormControl('', Validators.required)
    })
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
