import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {  Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserType } from 'src/app/Models/UserType';
import { registerationinfoVM } from 'src/app/Models/ViewModels/registerationinfoVM';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //revamped variables
  RegisterForm:FormGroup;
  AmbassadorForm:FormGroup
  ClientForm:FormGroup
  userType

  //revamp end

  // Variables declared for api retrival
  register:FormGroup;
  userTypeReg:any;
  userTypeID:NgModel
  AmbassadorRanking: NgModel
  titles= []
  userTypes= []
  countrys= []
  AmbassadorTypeIDs=[]
  
  constructor(private api: ApiService, 
    private route : Router, 
    private registerInfo: TemporaryStorage, 
    private alert:AlertController) { }

  ngOnInit() {

    //Revamped  begin
    this.RegisterForm = new FormGroup({
    usertypeID:new FormControl('', Validators.required),
    titleID:new FormControl('', Validators.required),
    name:new FormControl('', Validators.required),
    surname:new FormControl('', Validators.required),
    emailaddress:new FormControl('', Validators.compose([Validators.email, Validators.required])),
    phonenumber:new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])),
    countryID:new FormControl('', Validators.required),
    city:new FormControl('', Validators.required),
    address:new FormControl('', Validators.required),
    postalcode:new FormControl('',Validators.compose([Validators.required, Validators.maxLength(6)])),
    provinceID: new FormControl('', Validators.required)
    })

    this.AmbassadorForm = new FormGroup({
    idnumber:new FormControl('',Validators.compose([Validators.required, Validators.maxLength(12)]) ),
    idphoto:new FormControl('', Validators.required),
    proofOfAddress:new FormControl('', Validators.required),
    ambassadorType:new FormControl('', Validators.required),
    ambassadorreferralcode:new FormControl('', Validators.required),
    motivation:new FormControl('', Validators.required),
    })

    this.ClientForm = new FormGroup({
    clientreferralcode:new FormControl('', Validators.required),
    })
    
    //revamp end

   //Registeration form
   this.register = new FormGroup({
    usertypeID:new FormControl('', Validators.required),
    titleID:new FormControl('', Validators.required),
    name:new FormControl('', Validators.required),
    surname:new FormControl('', Validators.required),
    emailaddress:new FormControl('', Validators.required),
    phonenumber:new FormControl('', Validators.required),
    countryID:new FormControl('', Validators.required),
    city:new FormControl('', Validators.required),
    address:new FormControl('', Validators.required),
    postalcode:new FormControl('', Validators.required),
    idnumber:new FormControl(),
    idphotoANDAddress:new FormControl(),
    ambassadorType:new FormControl(),
    aliasname:new FormControl(),
    referralcode:new FormControl(),
    aboutmyself:new FormControl(),
    reasons:new FormControl(),
  })
  }

  //REVAMP BEGIN
  NoRefferralCode(){
    console.log("No refferral code");
  }

  Step2(){
    // if ambassador validate everything then conitinue
    if(this.RegisterForm.get(['usertypeID']).value == 2){
      if(this.RegisterForm.invalid && this.AmbassadorForm.invalid){
        console.log("ambassador form invalid");

      }
      else{
        console.log("continue, its ambassador user", this.AmbassadorForm.value, this.RegisterForm.value);
        this.api.ValidateRefferralCode(this.AmbassadorForm.get(['ambassadorreferralcode']).value).subscribe(data=>
          {
            //send information to the next page through an object
            let registrationInfo:registerationinfoVM = this.RegisterForm.value
            registrationInfo.referralcode = this.AmbassadorForm.get(['ambassadorreferralcode']).value
            registrationInfo.iDPhoto = this.AmbassadorForm.get(['idphoto']).value
            registrationInfo.idnumber = this.AmbassadorForm.get(['idnumber']).value
            registrationInfo.ambassadortype = this.AmbassadorForm.get(['ambassadorType']).value
            registrationInfo.aboutMyself = this.AmbassadorForm.get(['motivation']).value
            this.registerInfo.addRegisterInfo(registrationInfo)
            
            //Navigate to the next page
            this.AllInfoCorrectNotif()
           
          },(response: HttpErrorResponse) => {
            if (response.status === 404) {
              this.alertNotif("Refferal Doesn't exist!", "Opps!")
              
            }
            if (response.status === 500){
              this.alertNotif("Internal error", "Opps!")
             
            }
            if (response.status === 400){
              this.alertNotif("Something went wrong", "Opps!")
            }
          })
      }
    }

    // if client user validate everything then continue
    if(this.RegisterForm.get(['usertypeID']).value == 1){
      if(this.RegisterForm.invalid && this.ClientForm.invalid){
        console.log("client form invalid");
        
      }
      else{
        console.log("continue, its client user", this.ClientForm.value, this.RegisterForm.value);

        this.api.ValidateRefferralCode(this.ClientForm.get(['clientreferralcode']).value).subscribe(data=>
          {
            //send information to the next page through an object
            let registrationInfo:registerationinfoVM = this.RegisterForm.value
            registrationInfo.referralcode = this.ClientForm.get(['clientreferralcode']).value
            this.registerInfo.addRegisterInfo(registrationInfo)
            
            //Navigate to the next page
            this.AllInfoCorrectNotif()
           
          },(response: HttpErrorResponse) => {
            if (response.status === 404) {
              this.alertNotif("Refferal Doesn't exist!", "Opps!")
              
            }
            if (response.status === 500){
              this.alertNotif("Internal error", "Opps!")
             
            }
            if (response.status === 400){
              this.alertNotif("Something went wrong", "Opps!")
            }
          })
      }
    }
  }

  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }

  async AllInfoCorrectNotif(){
    const alert = await this.alert.create({
      header: "Are you sure?",
      message: "Are you sure you have fillied in all the information correctly?",
      buttons: [{text: 'yes', handler: () => {
        this.route.navigate(["next"])
      }},{text: "No"}]
    });

    await alert.present();
  }

  //REVAMP END
  
  



  // User selected function
  UserTypeSelected(){
    this.userTypeReg = this.userTypeID
    console.log(this.userTypeReg);
    // if(this.register.get('usertypeID').value == 3)
    // {
    //   this.register.get('idnumber').setValidators(Validators.required)
    //   this.register.get('idphotoANDAddress').setValidators(Validators.required)
    // }
    
    if(this.register.get('usertypeID').value == 2)
    {
      this.register.get('ambassadorType').setValidators(Validators.required)
      this.register.get('aliasname').setValidators(Validators.required)
      this.register.get('referralcode').setValidators(Validators.required)
      this.register.get('idnumber').setValidators(Validators.required)
      this.register.get('idphotoANDAddress').setValidators(Validators.required)
      this.register.get('aboutmyself').setValidators(Validators.required)
      this.register.get('reasons').setValidators(Validators.required)
    }
    if(this.register.get('usertypeID').value == 1)
    {
      this.register.get('referralcode').setValidators(Validators.required)
    }
    // else
    // {
    //   this.register.get('idnumber').clearValidators()
    //   this.register.get('idphotoANDAddress').clearValidators()
    //   this.register.get('ambassadorType').clearValidators()
    //   this.register.get('aliasname').clearValidators()
    //   this.register.get('referralcode').clearValidators()   
    //   this.register.get('aboutmyself').clearValidators()
    //   this.register.get('reasons').clearValidators()
    // }
  }

  

  //Step 2 of registering
  Next(){
    if(this.register.invalid){
      console.log("errors")
    }
    else{
      this.registerInfo.addRegisterInfo(this.register.value)
      if(this.register.get('usertypeID').value == 3){
        this.route.navigate(["next"])
        console.log(this.registerInfo.getRegisterInfo())
      }
      if(this.register.get('usertypeID').value == 1 || this.register.get('usertypeID').value == 2){
      this.api.ValidateRefferralCode(this.register.get('referralcode').value).subscribe(data =>{
        console.log(data)
        this.route.navigate(["next"])
        console.log(this.registerInfo.getRegisterInfo())
        
        },(response: HttpErrorResponse) => {
          if (response.status === 404) {
            this.alertNotif("Refferal Doesn't exist!", "Opps!")
            
          }
          if (response.status === 500){
            this.alertNotif("Internal error", "Opps!")
           
          }
          if (response.status === 400){
            this.alertNotif("Something went wrong", "Opps!")
          }
        })
      }
    }
  }
}

