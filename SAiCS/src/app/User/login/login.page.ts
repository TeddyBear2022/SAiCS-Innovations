import { Component, NgModule, OnInit,ContentChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Login form
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required ),
  },{updateOn:"submit"});

  
  ngOnInit() {
  }

  // Variables declared
  showPassword= false
  passwordToggleIcon= 'eye'

  // Login form Submission
  submitForm(){
    if(this.loginForm.valid)
    {
      
      console.log("valid form")
    }
    if(this.loginForm.invalid)
    {
      console.log("invalid form")
    }
    
  }

  // Password eye toggle
  passwordToggle():void{
    console.log("working")
    this.showPassword= !this.showPassword
    if(this.passwordToggleIcon== 'eye'){
      this.passwordToggleIcon = 'eye-off'
    }
    else{
      this.passwordToggleIcon='eye'
    }
  }
}
