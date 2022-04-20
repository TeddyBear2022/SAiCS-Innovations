import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required ),
  },{updateOn:"submit"});

  ngOnInit() {
  }

 
  submitForm(){
    if(this.loginForm.valid)
    {
      //add routing to next page and vaildate on sql
      console.log("valid form")
    }
    if(this.loginForm.invalid)
    {
      console.log("invalid form")
    }
  }
}
