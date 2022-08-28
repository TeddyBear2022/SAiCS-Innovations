import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { validators } from '@ionic/cli-framework';
import { LoginVM } from 'src/app/Models/ViewModels/LoginVM';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  //Variables
  EmailorUsernameForm: FormGroup
  OTPForm:FormGroup
  PassWordForm:FormGroup
  resetPwdToken:string

  EmailSent:boolean = true
  OTPSent:boolean = false
  OTPValidated: boolean = false

  constructor(private alert: AlertController, 
    private api:ApiService, 
    private route:Router) { }

  ngOnInit() {
    //localStorage.removeItem('token')
    //Forms
    this.EmailorUsernameForm = new FormGroup({
      emailorusername: new FormControl("",Validators.compose([Validators.email, Validators.required]) ) 
    })

    this.OTPForm = new FormGroup({
      otp: new FormControl("", Validators.required)
    })

    this.PassWordForm = new FormGroup({
      password: new FormControl("",  Validators.compose([ Validators.required, Validators.minLength(14)])),
      confirmPassword: new FormControl("",  Validators.compose([ Validators.required, Validators.minLength(14)]))
    })
  }

  EmailResetPassword(){
    
    if(this.EmailorUsernameForm.valid == true){
      //Create variable to send to the api
      var resetPassword:LoginVM = new LoginVM()
      resetPassword.EmailorUsername = this.EmailorUsernameForm.get(['emailorusername']).value

    //Send a forgot password request
      this.api.ForgotPassword(resetPassword).subscribe(data =>
      {
      //Log
      this.resetPwdToken = data.token.toString()
      console.log(data)

      if(data != null){
      this.EmailSent = false
      this.OTPSent = true
      this.OTPValidated = false
        }
      },(response: HttpErrorResponse) => {
        
        if (response.status === 404) {
          this.alertNotif("User doesnt exist!","Oops!")
          console.log("User doesnt exist!")
        }
        if (response.status === 500){
          this.alertNotif("Encountered an error","Oops!")
          console.log("Encountered an error")
        }
        if (response.status === 400){
          this.alertNotif("Something went wrong","")
          console.log("Internal server error")
        }
        
      })
      console.log(this.EmailorUsernameForm.value);
    }
    else{
      console.log("Invalid details");
    }
    
  }

  ValidateOTP(){
    if(this.OTPForm.valid == true){
      console.log(this.OTPForm.value)

      this.api.VerifyOTP(this.OTPForm.get(['otp']).value, this.resetPwdToken).subscribe(data => 
        {
          this.EmailSent = false
          this.OTPValidated = true
          this.OTPSent = false
          console.log(data);

          
        },(response: HttpErrorResponse) => {
        
        if (response.status === 404) {
          this.alertNotif("User doesnt exist!","Opps!")
          console.log("Incorrect OTP pin")
        }
        if (response.status === 500){
          this.alertNotif("Encountered an error","Opps!")
          console.log("Encountered an error")
        }
        if (response.status === 400){
          this.alertNotif("Something went wrong","")
          console.log("Internal server error")
        }
        
      })
      
    }
  }

  ResetPassword(){
    if(this.PassWordForm.valid && this.PassWordForm.get(['password']).value == this.PassWordForm.get(['confirmPassword']).value){
      
        console.log(this.PassWordForm.value);
        
        //Send reset password request
        this.api.ResetPassword(this.PassWordForm.get(['password']).value,this.resetPwdToken).subscribe(data => {
          console.log(data);
          if(data == true){
            this.resetPasswordSuccess("Congrats your password was reset", "Success!")
            //localStorage.removeItem("token")
          }
          
        },(response: HttpErrorResponse) => {
          if (response.status === 500){
            this.alertNotif("Encountered an error","Opps!")
            console.log("Encountered an error")
          }
          if (response.status === 400){
            this.alertNotif("Something went wrong","")
            console.log("Internal server error")
          }
          
        })
    }
    console.log("working");
    
  }

  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }

  async resetPasswordSuccess(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK', handler: ()=>{
        this.route.navigate(['home'])
      }}]
    });

    await alert.present();
  }
}
