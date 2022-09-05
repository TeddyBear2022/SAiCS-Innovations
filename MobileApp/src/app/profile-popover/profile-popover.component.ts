import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { ApiService } from '../Services/api.service';
import { TemporaryStorage } from '../Services/TemporaryStorage.service';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController, 
    private tempStorage:TemporaryStorage, 
    private router:Router, 
    private alert:AlertController,
    private api:ApiService) { }

  ngOnInit() {}

  viewProfile()
  {
    window.open('/profile', '_self')
    
    this.popoverController.dismiss();
  }

  close()
  {
   
    this.popoverController.dismiss();
  }

  //Are you sure 
  async confirm() {
    const alert = await this.alert.create({
      header: 'Logout',
      message: 'Are you sure?',
      buttons: [{text: 'Yes', handler: ()=> {
        this.api.Logout().subscribe(data =>
          {
            console.log(data)
            if(data == true){
            localStorage.clear()
            this.router.navigate(['login'])
            this.close()
            console.log("logout")
            }
          })       
      }},{text: "No", handler: ()=>
      this.close()
    }
  ]
    });

    await alert.present();
  }


  Logout(){
    
    this.confirm()
    
  }
}
