import { CurrencyPipe } from '@angular/common';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CartService } from './cart.service';
import { TemporaryStorage } from './TemporaryStorage.service';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private api: ApiService, private cp: CurrencyPipe, private tmpStorage: TemporaryStorage,  private cartService: CartService,) { }
  session = this.tmpStorage.getSessioninfo();
  items = JSON.parse(localStorage.getItem('cart_items'));
  OdrSmry = JSON.parse(localStorage.getItem('checkout'));

}
