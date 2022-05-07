import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private tempStorage: TemporaryStorage, private api:ApiService) { }

  ngOnInit() {
    this.register = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
    
    })
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
      let temp = this.register.value
      
      // let accessinfo:accessInfoVM
      // accessinfo.Username = this.register.value.password
      // this.tempStorage.addAccessInfo(this.register.value)
    //   // accessinfo.Password = this.register.get('password').value
    //   // accessinfo.Username = this.username
    //   // accessinfo.Password = this.password
    // //   this.userRegistration.AccessInfo = accessinfo
      
      //this.userRegistration.RegisterInfo = this.registrationinfo[0]
    //    this.userRegistration.AccessInfo = accessinfo
    // //  //this.userRegistration.AccessInfo{ passw}
    var test:accessInfoVM = new accessInfoVM(this.register.get('username').value,this.register.get('password').value)
    // test.Username = this.register.get('username').value
    // test.Password = this.register.get('password').value
    //let access= new accessInfoVM('','')
    this.registration= new registerVM(test, this.registrationinfo[0])
    //console.log(this.registration)
     // console.log(this.registration.RegisterInfo[0].usertype)
      this.api.registerUser(this.registration).subscribe(result => console.log(result))
      //need to create a constructor for 
      // do data binding instead
      //then send to api and it should register
     }
    }
  }
}
