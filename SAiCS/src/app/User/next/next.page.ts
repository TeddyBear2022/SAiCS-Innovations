import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { accessInfoVM } from 'src/app/Models/accessinfoVM';
import { registerationinfoVM } from 'src/app/Models/registerationinfoVM';
import { registerVM } from 'src/app/Models/registerVM';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';


@Component({
  selector: 'app-next',
  templateUrl: './next.page.html',
  styleUrls: ['./next.page.scss'],
})
export class NextPage implements OnInit {
  registerInfo:registerationinfoVM
  register:FormGroup
  passwordMatchError:boolean= false
  userRegistration:registerVM
  registration: registerVM
  registrationinfo:registerationinfoVM[]= this.tempStorage.getRegisterInfo()

  constructor(private tempStorage: TemporaryStorage, private api:ApiService, private route:Router, private alert:AlertController) { }

  ngOnInit() {
    this.register = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
    
    })
  }  

  //Alert
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Registration',
      message: 'Congratulations!  your registration was successful',
      buttons: [{text: 'OK', handler: ()=> {
        this.tempStorage.clearRegistrationInfo()
        this.route.navigate(['home'])}}]
    });

    await alert.present();
  }
  
  //register
  Register(){
    if(this.register.invalid){
      console.log("Invalid")
    }
    else{
      if(this.register.get('password').value != this.register.get('confirmpassword').value){
        this.passwordMatchError = true
        console.log("Passwords dont match")
        
      }
     else
     {
    this.passwordMatchError = false  
    var test:accessInfoVM = new accessInfoVM(this.register.get('password').value,this.register.get('username').value)
    this.registration= new registerVM(test, this.registrationinfo[0])
    this.api.registerUser(this.registration).subscribe(result => {
      console.log(result)
      if(result == true){
        this.presentAlert();
      }
    })

     }
    }
  }
}
