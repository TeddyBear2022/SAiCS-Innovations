import { Component, NgModule, OnInit,ContentChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { LoginVM } from 'src/app/Models/LoginVM';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Variables declared
  
  loginForm = new FormGroup({
    input: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required ),
  },
  {updateOn:"submit"});

  constructor(private api:ApiService, private tempStorage: TemporaryStorage, private router:Router) {
    
  }
  
  ngOnInit() {
  }

  //Variables declared
  showPassword= false
  passwordToggleIcon= 'eye'

  // Login form Submission
  submitForm(){
    //Valid
    if(this.loginForm.valid)
    {
      let logindetails = new LoginVM;
      logindetails.EmailorUsername = this.loginForm.get('input').value
      logindetails.Password =  this.loginForm.get('password').value
      this.api.login(logindetails).subscribe(auth => {
        if(auth == true){
          console.log("Authorized")
          this.api.session(logindetails).subscribe(sessioninfo =>{
            console.log(sessioninfo)
            this.tempStorage.addSession(sessioninfo)
            console.log(this.tempStorage.getSessioninfo())
            let pagenavigation = this.tempStorage.getSessioninfo()
            if(pagenavigation[0].userRoleId == 3){
              console.log("go to admin page")
            }
            if(pagenavigation[0].userRoleId == 1){
              console.log("go to client page")
              this.router.navigate(['landing-page'])
            }
          })
        }
        else{
          console.log("Unauthorized")
        }
      })
    }

    //Invalid
    if(this.loginForm.invalid)
    {
      console.log("invalid form")
    }
    
  }

  //Password eye toggle
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
