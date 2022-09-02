import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartItem } from 'src/app/Models/CartItem';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  merchandise = []
  products: any
  ItemQuantity: FormGroup
  session: any 

  constructor(
  public popoverController: PopoverController, 
  private api: ApiService,
  private tmpStorage:TemporaryStorage,
  private menu:MenuController,public router: Router, private fb: FormBuilder){}
  
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
    this.menu.enable(true, 'ambassador-menu');
    this.GetCatalog()

    this.ItemQuantity = this.fb.group({
      quantity: new FormControl('', Validators.required)
    })
   
    
  }
  ionViewDidEnter(){
    this.menu.enable(true, 'ambassador-menu');
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
 let newItem = {} as CartItem
 newItem.merchandiseId = item.id 
 newItem.specialId = null
 newItem.price = item.price
 newItem.quantity = item.quantity

this.api.AddToCart(this.session[0].id, newItem).subscribe((res) => {console.log(res.body);});

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
