import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() {}

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
    this.cartItemCount.next(this.cartItemCount.value + 1);

  }

  getItems() {
    return this.items;
  }

  getCartItemCount() {
    this.loadCart()
    return this.items.length;
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
    this.cartItemCount.next(0);
  }

  removeItem(item) {
    const index = this.items.findIndex((o) => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
      this.cartItemCount.next(this.cartItemCount.value - 1);
    }
  }

  itemInCart(item): boolean {
    return this.items.findIndex((o) => o.id === item.id) > -1;
  }

}
