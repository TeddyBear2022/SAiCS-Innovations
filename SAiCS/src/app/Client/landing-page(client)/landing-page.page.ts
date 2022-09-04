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

  
  merchandise = []
  products: any
  session: any 

  constructor(
  public popoverController: PopoverController, 
  private api: ApiService,
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
    this.session = this.tmpStorage.getSessioninfo()
    this.menu.enable(true, 'client-menu');
    this.GetCatalog()
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
 let newItem = {} as CartItem
 newItem.merchandiseId = item.id 
 newItem.specialId = null
 newItem.price = item.price
 newItem.quantity = item.quantity

this.api.ClientAddToCart(this.session[0].id, newItem).subscribe((res) => {console.log(res.body);});
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

ViewCart(){
  console.log("cart");
  
this.route.navigate(['clients-cart'])
}

ViewItem(id: number)
{
  localStorage.setItem('CatalogItem', JSON.stringify(id))
  this.route.navigate(['/item-details'])
}

}
