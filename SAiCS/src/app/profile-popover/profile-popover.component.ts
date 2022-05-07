import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { TemporaryStorage } from '../Services/TemporaryStorage.service';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController, private tempStorage:TemporaryStorage, private router:Router) { }

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
  Logout(){
    this.tempStorage.logout()
    this.router.navigate(['home'])
    this.popoverController.dismiss();
    console.log("logout")
  }
}
