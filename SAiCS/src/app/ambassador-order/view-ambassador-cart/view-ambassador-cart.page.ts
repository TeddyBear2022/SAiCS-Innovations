import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-ambassador-cart',
  templateUrl: './view-ambassador-cart.page.html',
  styleUrls: ['./view-ambassador-cart.page.scss'],
})
export class ViewAmbassadorCartPage implements OnInit {
  products: any
  deliveryOption=false
  //For totals to reflect
  itemTotal=[]
  itemCount = 0
  totalCost = 0
  subtotal = 0
  discount = 0
  vat = 0

  constructor(private api: ApiService, private router: Router) { }

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
  }

  ClearCart(id: number)
  {
    this.api.ClearCart(id).subscribe()
    this.ViewCart()
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

PlaceOrder()
{

  var orderdetails = {cartId: this.products[0].cartID, 
    'itemCount': this.itemCount, 'discount': this.discount,
    'vat': this.vat, 'subtotal': this.subtotal, 'totalCost': this.totalCost, 'deliveryOption': this.deliveryOption}
  localStorage.setItem('checkout', JSON.stringify(orderdetails))
  this.router.navigate(['ambassador-checkout-ii'])
}

}
