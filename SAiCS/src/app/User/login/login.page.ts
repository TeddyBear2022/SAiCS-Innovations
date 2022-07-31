import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit,ContentChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { LoginVM } from 'src/app/Models/ViewModels/LoginVM';
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
      console.log(logindetails)
      this.api.login(logindetails).subscribe(test=> {
      console.log(test);
      this.api.session(logindetails).subscribe(sessioninfo =>{
        console.log("working")
        this.tempStorage.addSession(sessioninfo)
        console.log("session info:"+ sessioninfo)
        console.log(this.tempStorage.getSessioninfo())
        let pagenavigation = this.tempStorage.getSessioninfo()
        if(pagenavigation[0].userRoleId == 3){
          console.log("go to admin page")
        }
        if(pagenavigation[0].userRoleId == 1){
          console.log("go to client page")
          this.router.navigate(['landing-page'])
        }
        else{
          console.log("no page prolly an ambassador");
          
        }
      })}
      ,(response: HttpErrorResponse) => {
        
        if (response.status === 404) {
          console.log("User doesnt exist")
        }
        if (response.status === 500){
          console.log("Encountered an error")
        }
        if (response.status === 400){
          console.log("wrong password an error")
        }
        
      })
    }
    //   this.api.login(logindetails).subscribe(auth => {
    //     if(auth == true){
    //       console.log("Authorized")
    //       console.log(logindetails)
    //       this.api.session(logindetails).subscribe(sessioninfo =>{
    //         console.log("working")
    //         // this.tempStorage.addSession(sessioninfo)
    //         // console.log("session info:"+ sessioninfo)
    //         // console.log(this.tempStorage.getSessioninfo())
    //         // let pagenavigation = this.tempStorage.getSessioninfo()
    //         // if(pagenavigation[0].userRoleId == 3){
    //         //   console.log("go to admin page")
    //         // }
    //         // if(pagenavigation[0].userRoleId == 1){
    //         //   console.log("go to client page")
    //         //   this.router.navigate(['landing-page'])
    //         // }
    //       }, (response: HttpErrorResponse) => {
            
    //         if (response.status === 404) {
    //           console.log("User doesnt exist")
    //         }
    //         if (response.status === 500){
    //           console.log("Encountered an error")
    //         }
    //         if(response.status === 200){
    //           console.log(response.error)
    //         }
    //       }
    //       )
    //     }
    //     else{
    //       console.log("Unauthorized")
    //     }
    //   })
    // }

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
  

  //Password eye toggle
  // passwordToggle():void{
  //   console.log("working")
  //   this.showPassword= !this.showPassword
  //   if(this.passwordToggleIcon== 'eye'){
  //     this.passwordToggleIcon = 'eye-off'
  //   }
  //   else{
  //     this.passwordToggleIcon='eye'
  //   }
  // }
}
