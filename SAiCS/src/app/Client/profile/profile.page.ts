import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { registerationinfoVM } from 'src/app/Models/registerationinfoVM';
import { registerVM } from 'src/app/Models/registerVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileinfo= []
  title:string
  name:string
  Surname:string
  emailaddress:string
  phonenumber:number
  username:string
  country:string
  city:string
  address:string
  postal:string
  profilereginfo:registerationinfoVM 

  constructor(public popoverController: PopoverController, private tempStorage:TemporaryStorage){}

  // Show Profile optionss when icon on right of navbar clicked function
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ngOnInit() {
    this.profileinfo = this.tempStorage.getSessioninfo()
    this.name = this.profileinfo[0].name
    this.Surname = this.profileinfo[0].surname
    this.title = this.profileinfo[0].title.titleName
    this.emailaddress = this.profileinfo[0].emailAddress
    this.country = this.profileinfo[0].country.countryName
    this.city = this.profileinfo[0].address.city
    this.address = this.profileinfo[0].address.address1
    this.postal = this.profileinfo[0].address.postalCode
    this.phonenumber = this.profileinfo[0].phoneNumber
    this.username = this.profileinfo[0].username

  console.log(this.profileinfo[0])
  }

}
