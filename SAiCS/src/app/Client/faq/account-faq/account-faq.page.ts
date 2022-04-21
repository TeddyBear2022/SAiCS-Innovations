import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-faq',
  templateUrl: './account-faq.page.html',
  styleUrls: ['./account-faq.page.scss'],
})
export class AccountFaqPage implements OnInit {

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
