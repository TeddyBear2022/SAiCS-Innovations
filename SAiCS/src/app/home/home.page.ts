import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private route : Router) {

  }
  Login(){
    this.route.navigate(['login'])
  }
  
  Register(){

    this.route.navigate(['register'])
  }

  Home(){
    this.route.navigate(['home'])
  }
}
