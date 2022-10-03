import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {  Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { UserType } from 'src/app/Models/UserType';
import { registerationinfoVM } from 'src/app/Models/ViewModels/registerationinfoVM';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
import { NoRefferralCodePage } from './modals/no-refferral-code/no-refferral-code.page';

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
  inputInfo = undefined
  selectedFile:any 
  isModalOpen = false;
  AmbModalOpen = false;
  getRefCode: any 
  getAmbRefCode: any 
  
  constructor(private api: ApiService, 
    private route : Router, 
    private registerInfo: TemporaryStorage, 
    private alert:AlertController,
    private modal:ModalController) { }

  ngOnInit() {

    //Revamped  begin
    this.RegisterForm = new FormGroup({
    usertypeID:new FormControl('', Validators.required),
    titleID:new FormControl('', Validators.required),
    name:new FormControl('',Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]*$/)])),
    surname:new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]*$/)])),
    emailaddress:new FormControl('', Validators.compose([Validators.email, Validators.required])),
    phonenumber:new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.minLength(10), Validators.pattern(/^[0-9]*$/)])),
    countryID:new FormControl('', Validators.required),
    city:new FormControl('',Validators.compose([Validators.required])),
    address:new FormControl('', Validators.required),
    postalcode:new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern(/^[0-9]*$/)])),
    provinceID: new FormControl('', Validators.required)
    })

    this.AmbassadorForm = new FormGroup({
    idnumber:new FormControl('',Validators.compose([Validators.required,Validators.minLength(4), Validators.maxLength(13)]) ),
    idphoto:new FormControl('', Validators.required),
    proofOfAddress:new FormControl('', Validators.required),
    ambassadorType:new FormControl('', Validators.required),
    ambassadorreferralcode:new FormControl('', Validators.required),
    motivation:new FormControl('', Validators.required),
    })

    this.ClientForm = new FormGroup({
    clientreferralcode:new FormControl('', Validators.required),
    })
    
    this.api.InputInformation().subscribe(data=>{
      this.inputInfo = data
      console.log(data)
    })
    
  }
  ionViewDidEnter(){
    this.api.InputInformation().subscribe(data=>{
      this.inputInfo = data
      console.log(data)
    })
  }

  //REVAMP BEGIN
  NoRefferralCode(isOpen: boolean){
  this.api.NoRefCode().subscribe((res) => {
    let data: any = res
    this.getRefCode = data
     console.log(this.getRefCode);})
    this.isModalOpen = isOpen;
  }

  CloseRefferralCode(isOpen: boolean){
      
      this.isModalOpen = isOpen;
  }

  AmbNoRefCode(isOpen: boolean){
    this.api.AmbNoRefCode().subscribe((res) => {
      let data: any = res
      this.getAmbRefCode = data
       console.log(this.getRefCode);})
      this.AmbModalOpen = isOpen;
    }
  
    CloseAmbNoRefCode(isOpen: boolean){
        
        this.AmbModalOpen = isOpen;
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
            this.api.AccountExists(this.RegisterForm.get(['emailaddress']).value).subscribe(data =>{
              if(data == true){
                this.AccountExists()
              }
              if(data ==false){
                //send information to the next page through an object
                let registrationInfo:registerationinfoVM = this.RegisterForm.value
                registrationInfo.referralcode = this.AmbassadorForm.get(['ambassadorreferralcode']).value
                registrationInfo.iDPhoto = this.selectedFile
                
                registrationInfo.idnumber = this.AmbassadorForm.get(['idnumber']).value
                registrationInfo.ambassadortype = this.AmbassadorForm.get(['ambassadorType']).value
                registrationInfo.aboutMyself = this.AmbassadorForm.get(['motivation']).value
                this.registerInfo.addRegisterInfo(registrationInfo)
            
                //Navigate to the next page
                this.AllInfoCorrectNotif(2)
           
              }
            })
            
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
      if(this.RegisterForm.valid && this.ClientForm.valid){
        console.log("continue, its client user", this.ClientForm.value, this.RegisterForm.value);

        this.api.ValidateRefferralCode(this.ClientForm.get(['clientreferralcode']).value).subscribe(data=>
          {
            //validate if the account already exists on the system
            this.api.AccountExists(this.RegisterForm.get(['emailaddress']).value).subscribe(data => {
              //Account already exists
              if(data == true){
                this.AccountExists()
              }

              //Account doesnt exist
              if(data == false){
              //send information to the next page through an object
              let registrationInfo:registerationinfoVM = this.RegisterForm.value
              registrationInfo.referralcode = this.ClientForm.get(['clientreferralcode']).value
              this.registerInfo.addRegisterInfo(registrationInfo)
              
              //Navigate to the next page
              this.AllInfoCorrectNotif(1)

              }
            },(response: HttpErrorResponse) => {
              if (response.status === 404) {
                this.alertNotif("Refferal Doesn't exist!", "Oops!")
                
              }
              if (response.status === 500){
                this.alertNotif("Internal error", "Oops!")
               
              }
              if (response.status === 400){
                this.alertNotif("Something went wrong", "Oops!")
              }
            })
            
          },(response: HttpErrorResponse) => {
            if (response.status === 404) {
              this.alertNotif("Refferal Doesn't exist!", "Oops!")
              
            }
            if (response.status === 500){
              this.alertNotif("Internal error", "Oops!")
             
            }
            if (response.status === 400){
              this.alertNotif("Something went wrong", "Oops!")
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

  async AllInfoCorrectNotif(usertype:number){
    const alert = await this.alert.create({
      header: "Are you sure?",
      message: "Are you sure you have fillied in all the information correctly?",
      buttons: [{text: 'yes', handler: () => {
        if(usertype == 2){
          this.route.navigate(["register/banking-details"])
        }
        if(usertype == 1){
          this.route.navigate(["next"])
        }
        
      }},{text: "No"}]
    });

    await alert.present();
  }

  async AccountExists(){
    const alert = await this.alert.create({
      header: "Oops",
      message: "An account with that associated email address already exists on the the system.",
      buttons: [{text: 'Ok'}]
    });

    await alert.present();
  }


  //Convert file to base64
  onFileSelected(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      if (encoded.length % 4 > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      this.selectedFile = encoded;
      console.log('encoded successfully');
    };
  }

  
}

