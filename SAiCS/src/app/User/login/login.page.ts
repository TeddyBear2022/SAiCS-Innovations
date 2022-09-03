import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit,ContentChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonInput, LoadingController, NavController } from '@ionic/angular';
import { LoginVM } from 'src/app/Models/ViewModels/LoginVM';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Output() myOutput:EventEmitter<string>= new EventEmitter();  
   outputMessage:string="I Client." 
  // Variables declared
  
  loginForm = new FormGroup({
    input: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required ),
  },
  {updateOn:"submit"});

  constructor(private api:ApiService,
     private tempStorage: TemporaryStorage, 
     private router:Router, 
     private nav:NavController,
     private alert:AlertController, 
     private loading:LoadingController) {
    
  }
  
  ngOnInit() {
  }

  //Variables declared
  showPassword= false
  passwordToggleIcon= 'eye'

  // Login form Submission
   async submitForm(){
    //Valid
    if(this.loginForm.valid)
    {
      // this.Loading()
      let logindetails = new LoginVM;
      logindetails.EmailorUsername = this.loginForm.get('input').value
      logindetails.Password =  this.loginForm.get('password').value
      console.log(logindetails)
      this.api.login(logindetails).subscribe(data=> {
      // this.DissmissLoading()
      console.log(data.token.toString());
      this.api.SetToken(data.token.toString())
      this.api.session(logindetails).subscribe(sessioninfo =>{
        this.tempStorage.addSession(sessioninfo)
        // console.log("user role:"+sessioninfo[0].userRoleId)
        console.log(this.tempStorage.getSessioninfo())
        let pagenavigation = this.tempStorage.getSessioninfo()
        

        //Admin user
        if(pagenavigation[0].userRoleId == 3){
          this.router.navigate(['landing-page-admin'])
          localStorage.setItem('UserRole',"Admin")
          // console.log("go to admin page")
        }

        //Client user
        if(pagenavigation[0].userRoleId == 1){
          //console.log("go to client page")
          this.myOutput.emit(this.outputMessage);
          localStorage.setItem('UserRole',"Client")
          this.router.navigate(['landing-page'])
        }

        //Ambassador user
        if(pagenavigation[0].userRoleId == 2){
          console.log(pagenavigation[0].id)
          this.api.ApplicationStatus(pagenavigation[0].id).subscribe(data => {
            let applicationStatus = data
            if(applicationStatus[0].applicationStatusId==1){
              this.router.navigate(['waiting'])
            }
            if(applicationStatus[0].applicationStatusId==2){
              this.router.navigate(['ambassador-landing-page'])
              localStorage.setItem('UserRole',"Ambassador")
            }
          })
          
        }
      })}
      ,(response: HttpErrorResponse) => {
        
        if (response.status === 404) {
          
           this.alertNotif("User doesnt exist or wrong password","Opps!")
          // this.DissmissLoading()
           console.log("User doesnt exist or wrong password")
        }
        if (response.status === 500){
          this.alertNotif("Encountered an error","Opps!")
          // this.DissmissLoading()
          console.log("Encountered an error")
        }
        if (response.status === 400){
          this.alertNotif("Something went wrong","")
          // this.DissmissLoading()
          console.log("wrong password an error")
        }
        
      })
    }
   
    //Invalid
    if(this.loginForm.invalid)
    {
      console.log("invalid form")
    }
    
  }

  // async Loading(){
  //   const loading = await this.loading.create({
  //     message: 'Logging in...',
  //     spinner: 'circles'
  //   })
  //   loading.present()
  // }
  // DissmissLoading(){
  //   this.loading.dismiss()
  // }

  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
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
