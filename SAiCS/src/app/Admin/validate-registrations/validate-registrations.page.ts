import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { RegistrationReqVm } from 'src/app/Models/ViewModels/RegistrationReqVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-validate-registrations',
  templateUrl: './validate-registrations.page.html',
  styleUrls: ['./validate-registrations.page.scss'],
})
export class ValidateRegistrationsPage implements OnInit {

  //Variables
  registrations:any = []
  noResults = false
  search = undefined
  inputInfo
  RegistrationForm:FormGroup
  username

  constructor(private popoverController:PopoverController, 
    private menu:MenuController, 
    private api:ApiService, 
    private route:Router, 
    private alert:AlertController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');

    this.RegistrationForm = new FormGroup({
      ambtype: new FormControl('', Validators.required)
    })

    this.RegistrationForm.reset()

    this.api.AllRegistrations().subscribe(data => {
      console.log(data)
    })
    this.api.InputInformation().subscribe(data=>{
      this.inputInfo = data 
      console.log(data)
    })

    this.username = localStorage.getItem('UserName')
  }

  ionViewDidEnter(){
    this.api.AllRegistrations().subscribe(data => {
      console.log(data)
      this.registrations = data
    })

    this.RegistrationForm.reset()
  }

  SearchAmbassador(event){
    // console.log(event.detail.value);
    this.search = event.detail.value
    if(this.search == ''){
      this.ClearSearch()
    }
  }

  Search(){
    
    if(this.search == undefined){
      console.log("No search in the box...")
      this.alertNotif("Please enter something in the search box", "")
    }
    if(this.search != undefined){
      console.log("search...",this.search)
      this.api.SearchAmbassadorReg(this.search).subscribe(data =>{
        this.noResults = false 
        this.registrations = data
        console.log(data);
        
      },(response: HttpErrorResponse) => {
          
        if (response.status === 404) {
          this.noResults = true 
          console.log("Search result not found")
        }
        
    })
    }
 
}

  ClearSearch(){
    console.log("clear");
    this.search= undefined
    this.noResults = false 
    this.api.AllRegistrations().subscribe(data =>
      {
        this.registrations = data
        
      })
  }
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ViewRegistration(id:string){
    console.log(id);
    localStorage.setItem('registrationRequest', id)
    this.route.navigate(['validate-registrations/view-ambassador-info'])
  }

  ShowAmbType(event){
    console.log(event)
  }
  Accept(request, ambassadorType){
    //Registration request object
    let regRequest:RegistrationReqVm = new RegistrationReqVm()
    regRequest.Registration = request
    regRequest.SelectedRanking =Number(ambassadorType)

    //Accept registration request api request
    this.api.AccceptRegistration(regRequest).subscribe(data => {
      console.log(data)
      if(data ==true){
        this.api.AllRegistrations().subscribe(data => {
          this.alertNotif("Registration has been accepted","Success")
          console.log(data)
          this.registrations = data

        })
      }
    })
    console.log(regRequest)
  }

  Reject(request){
    this.api.RejectRegistration(request).subscribe(data => {
      console.log(data)
      if(data ==true){
        this.api.AllRegistrations().subscribe(data => {
          this.alertNotif("Registration has been rejected","Success")
          console.log(data)
          this.registrations = data

        })
      }
    })
    console.log(request)
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
