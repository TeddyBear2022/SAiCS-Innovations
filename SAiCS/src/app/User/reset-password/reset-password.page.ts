import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  EmailSent:boolean = true
  OTPSent:boolean = false
  OTPValidated: boolean = false

  constructor(private alert: AlertController, 
    private api:ApiService) { }

  ngOnInit() {

    this.EmailorUsernameForm = new FormGroup({
      emailorusername: new FormControl("",Validators.compose([Validators.email, Validators.required]) ) 
    })

    this.OTPForm = new FormGroup({
      otp: new FormControl("", Validators.required)
    })

    this.PassWordForm = new FormGroup({
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required)
    })
  }

  EmailResetPassword(){
    
    if(this.EmailorUsernameForm.valid == true){
      // console.log(this.EmailorUsernameForm.get(['emailorusername']).value);
      var resetPassword:LoginVM = new LoginVM()
      resetPassword.EmailorUsername = this.EmailorUsernameForm.get(['emailorusername']).value
    // var email = this.EmailorUsernameForm.get(['emailorusername']).value.toString()
      this.api.ForgotPassword(resetPassword).subscribe(id =>
      {
      console.log(id)
      if(id != null){
      this.EmailSent = false
      this.OTPSent = true
      this.OTPValidated = false
        }
      },(response: HttpErrorResponse) => {
        
        if (response.status === 404) {
          this.alertNotif("User doesnt exist!","Opps!")
          console.log("User doesnt exist!")
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
      console.log(this.EmailorUsernameForm.value);
    }
    else{
      console.log("Invalid details");
    }
    
  }

  ValidateOTP(){
    if(this.OTPForm.valid == true){
      this.EmailSent = false
      this.OTPValidated = true
      this.OTPSent = false
      console.log(this.OTPForm.value)
      
    }
  }

  ResetPassword(){
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
}
