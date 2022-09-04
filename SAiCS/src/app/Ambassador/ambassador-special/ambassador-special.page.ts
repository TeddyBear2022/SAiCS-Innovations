import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-ambassador-special',
  templateUrl: './ambassador-special.page.html',
  styleUrls: ['./ambassador-special.page.scss'],
})
export class AmbassadorSpecialPage implements OnInit {
  merchandise = []
  session: any 


  constructor(public popoverController: PopoverController, 
    private api: ApiService,public router: Router,  private tmpStorage:TemporaryStorage,
    private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.session = this.tmpStorage.getSessioninfo()
    this.GetCatalog()
  }

  async GetCatalog()
  {
  var data = await this.api.ViewCatelogSpecials().toPromise()
  var dataObj = JSON.parse(JSON.stringify(data));
  this.merchandise = dataObj;
  console.log(this.merchandise);
  
  }

  
AddToCart(id)
{
    
var item = this.merchandise.find(x => x.id === id)
if (item.quantity > 0) {
 let newItem = {} as CartItem
 newItem.merchandiseId = item.specialCategory == 1? item.id : null
 newItem.specialId = item.specialCategory == 2? item.id : null
 newItem.price = item.price
 newItem.quantity = item.quantity

this.api.AddToCart(this.session[0].id, newItem).subscribe((res) => {console.log(res.body);});
} else {
  console.log('Inavlid Form');
}

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
