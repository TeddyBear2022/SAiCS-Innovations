import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserType } from 'src/app/Models/UserType';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // REgistration form
  // registerForm : FormGroup = new FormGroup({
  //   usertype: new FormControl('', Validators.required),
  // })

  // Variables declared
  userTypeReg:any;
  userType:NgModel
  AmbassadorRanking: NgModel
  titles= []
  userTypes= []
  countrys= []
  
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.api.getTitles().subscribe(result => {
      this.titles= result
      console.log(result)
    })
    this.api.getUserTypes().subscribe(result => {
      this.userTypes = result
      console.log(result)
    })
    this.api.getCountrys().subscribe(result => {
      this.countrys = result
      console.log(result)
    })
  }

  // User selected function
  UserTypeSelected(){
    this.userTypeReg = this.userType
    console.log(this.userTypeReg);
    
  }
}
