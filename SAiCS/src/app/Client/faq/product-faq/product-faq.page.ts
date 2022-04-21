import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-faq',
  templateUrl: './product-faq.page.html',
  styleUrls: ['./product-faq.page.scss'],
})
export class ProductFaqPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;

  txtClick1(){
    this.display = !this.display
  }

  txtClick2(){
    this.display2 = !this.display2
  }

  txtClick3(){
    this.display3 = !this.display3
  }

}
