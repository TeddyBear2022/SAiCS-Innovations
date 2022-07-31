import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-ambassador-cart',
  templateUrl: './view-ambassador-cart.page.html',
  styleUrls: ['./view-ambassador-cart.page.scss'],
})
export class ViewAmbassadorCartPage implements OnInit {
  products: any
  //For totals to reflect
  
  itemTotal=[]
  itemCount

  constructor(private api: ApiService) { }

  ngOnInit() {
      this.ViewCart()
      console.log(localStorage.getItem('userID'));
      
  }


  ViewCart()
  {
      this.api.ViewCart().subscribe((data) =>
        {
          this.products = data
          this.itemCount = this.products.length
          console.log(this.products)
          for(let i=0; i<this.products.length; i++){

            this.itemTotal[i] = this.products[i].quantity * this.products[i].price
            ; //use i instead of 0
        }
          
        })
  }

  ClearCart(id: any)
  {
      return id
  }


//  Calculation(quantity:any, price: any)
//  {
//     this.itemTotal = quantity * price
//  }  
}
