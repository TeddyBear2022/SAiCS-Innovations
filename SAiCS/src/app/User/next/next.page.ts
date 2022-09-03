import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { accessInfoVM } from 'src/app/Models/ViewModels/accessinfoVM';
import { registerationinfoVM } from 'src/app/Models/ViewModels/registerationinfoVM';
import { registerVM } from 'src/app/Models/ViewModels/registerVM';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';


@Component({
  selector: 'app-next',
  templateUrl: './next.page.html',
  styleUrls: ['./next.page.scss'],
})
export class NextPage implements OnInit {
  //Revamp begin
  registerInfo:registerationinfoVM
  register:FormGroup
  passwordMatchError:boolean= false
  userRegistration:registerVM
  registration: registerVM
  registrationinfo:registerationinfoVM[]= this.tempStorage.getRegisterInfo()
  
  constructor(private tempStorage: TemporaryStorage, 
    private api:ApiService, 
    private route:Router, 
    private alert:AlertController) { }

  ngOnInit() {
    this.register = new FormGroup({
    username:new FormControl(this.registrationinfo[0].emailaddress),
    password: new FormControl('', Validators.compose([ Validators.required, Validators.minLength(14)])),
    confirmpassword: new FormControl('',  Validators.compose([ Validators.required, Validators.minLength(14)]))
    
    })
  }  

  //Registration successful alert
  async success() {
    const alert = await this.alert.create({
      header: 'Registration',
      message: 'Congratulations!  your registration was successful',
      buttons: [{text: 'OK', handler: ()=> {
        this.tempStorage.clearRegistrationInfo()
        this.route.navigate(['home'])}}]
    });

    await alert.present();
  }

  //Registration unsuccessful alert
  async unsuccessful() {
    const alert = await this.alert.create({
      header: 'Registration',
      message: 'Your registration was sadly unsusccessful. Please ensure all the relevant details are present',
      buttons: [ {text: 'OK', handler: ()=> {
        this.tempStorage.clearRegistrationInfo()
        this.route.navigate(['home'])}}]
    });
    await alert.present();
  }

  async useExists() {
    const alert = await this.alert.create({
      header: 'Oops',
      message: 'An account already exists with the email address you entered. Please try refistering again with a different valid email address.',
      buttons: [ {text: 'OK', handler: ()=> {
        this.tempStorage.clearRegistrationInfo()
        this.route.navigate(['home'])}}]
    });
    await alert.present();
  }
  
  //register
  Register(){
    if(this.register.invalid){
      console.log("Invalid")
      console.log(this.register.value)
    }
    else{
      if(this.register.get('password').value != this.register.get('confirmpassword').value){
        this.passwordMatchError = true
        console.log("Passwords dont match") 
      }
     else
     {
    this.passwordMatchError = false  
    var completedRegistration:accessInfoVM = new accessInfoVM(this.register.get('password').value,this.registrationinfo[0].emailaddress)
    this.registration= new registerVM(completedRegistration, this.registrationinfo[0], JSON.parse(localStorage.getItem('bankAccount')))
    console.log(this.registration)
    this.api.registerUser(this.registration).subscribe(result => {
      console.log(result)
      this.success();
    },(response: HttpErrorResponse) => {
        
      if (response.status === 404) {
        console.log("User already exists")
        this.useExists()
      }
      if (response.status === 500){
        console.log("Encountered an error"+response.error.text)
        this.unsuccessful()
      }
      if (response.status === 400){
        console.log("something went wrong"+response.error.text)
        this.unsuccessful()
      }
      
    })

     }
    }
  }
}
