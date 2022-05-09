import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm : FormGroup = new FormGroup({
    usertype: new FormControl('', Validators.required),
  })

  userTypeReg:any;
  userType:NgModel
  AmbassadorRanking: NgModel
  
  constructor() { }

  ngOnInit() {
  }

  UserTypeSelected(){
    this.userTypeReg = this.userType
    console.log(this.userTypeReg);
    
  }
}
