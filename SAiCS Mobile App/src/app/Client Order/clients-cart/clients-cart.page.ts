import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';


@Component({
  selector: 'app-clients-cart',
  templateUrl: './clients-cart.page.html',
  styleUrls: ['./clients-cart.page.scss'],
})
export class ClientsCartPage implements OnInit {

  products: any
  deliveryOption=false
  //For totals to reflect
  itemTotal=[]
  itemCount = 0
  totalCost = 0
  subtotal = 0
  discount = 0
  vat = 0
  constructor(public popoverController:PopoverController,private alertController: AlertController,private api: ApiService, private route:Router) { }

  ngOnInit() {
    this.ViewCart()
    //console.log(localStorage.getItem('userID'));
    
    
}
ViewCart()
{
    this.api.ViewCart().subscribe((data) =>
      {
        this.products = data
        this.itemCount = this.products.length
        console.log(this.products)
        for(let i=0; i<this.products.length; i++){

          this.itemTotal[i] = this.products[i].quantity * this.products[i].price //use i instead of 0  
        }
      
      for (var i = 0; i< this.itemTotal.length; i++){
        this.subtotal += this.itemTotal[i];
       }
      
       //calculate disicout, vat and totalCost
       this.discount = this.products[0].itemDiscount.discount * this.subtotal
       this.vat = this.products[0].vaT * this.subtotal
        this.totalCost = this.subtotal - this.discount 
        console.log(this.totalCost)
      });    
      
      
}

RemoveFromCart(id: number)
{
    this.api.RemoveFromCart(id).subscribe();
    this.ViewCart()
    window.location.reload()
}

ClearCart(id: number)
{
  this.api.ClearCart(id).subscribe()
  this.ViewCart()
  window.location.reload()
}


toggleValue()
{
if(this.deliveryOption == true)
this.totalCost += 200
else
this.totalCost -= 200

console.log(this.totalCost)
  return this.totalCost 
}   
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header:'Thank You For Your Order!',
      message: 'At SAiCS we know the struggles many of us face everyday and that is why we are offering you the opportunity to take control of your health and start living a healthy and maintable lifestyle with our top of the range and clinically tested products!',
      cssClass : 'ThankYouAlert',
      buttons: [
        {
            text: 'Back to home'
        },
      ]
    });
    await alert.present();}
    PlaceOrder()
{

  var orderdetails = {cartId: this.products[0].cartID, 
    'itemCount': this.itemCount, 'discount': this.discount,
    'vat': this.vat, 'subtotal': this.subtotal, 'totalCost': this.totalCost, 'deliveryOption': this.deliveryOption}
  localStorage.setItem('checkout', JSON.stringify(orderdetails))
  this.route.navigate(['client-checkout'])
}
}
