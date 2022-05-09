import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Category:any;
  

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

  SelectedCategory(string:string){
    console.log(string)
    this.Category = string
  }
}
