import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  items = [];
  total_price: number = 0;
  total_cart_qty:number = 0;

  constructor() {}

  
  //public itemsSubject =new BehaviorSubject<any>([]);

  addToCart(addItem) {
    this.items = JSON.parse(localStorage.getItem('cart_items')) || [];

    // add to it, only if it's empty
    var item = this.items.find((item) => item.name === addItem.name);
    //let existingItems = [];
    //var item = this.itemInCart(addItem)
    if (item) {
      item.quantity += addItem.quantity;
    } else {
      this.items.push(addItem);
      //this.itemsSubject.next(itemImage)
     }

    this.saveCart();

  }

  isAddedToCart(id) {
    return this.items.some(item => item['id'] == id );
  }

  getCartTotalQty() {
    console.log(this.items);
    this.total_cart_qty = this.items.length;
  }

  getItems() {
    return this.items;
  }

  loadCart() {
    this.items = JSON.parse(localStorage.getItem('cart_items')) ?? [];
  }

  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cart_items');
  }

  removeItem(item) {
    const index = this.items.findIndex((o) => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  itemInCart(item): boolean {
    return this.items.findIndex((o) => o.id === item.id) > -1;
  }

  calculatePrice(product) {
    let price = product['price'];
    return Number(product['quantity']) * Number(price); 
  }

  totalPrice() {
    this.total_price = 0;

    for ( let item of this.items ) {
      this.total_price += this.calculatePrice(item);
    }
  }
 

}
