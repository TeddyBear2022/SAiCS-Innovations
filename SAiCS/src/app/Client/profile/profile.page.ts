import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { DeleteUserVM } from 'src/app/Models/ViewModels/DeleteUserVM';
import { registerationinfoVM } from 'src/app/Models/ViewModels/registerationinfoVM';
import { registerVM } from 'src/app/Models/ViewModels/registerVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
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
  userID:number
  userRoleID:number
  refferalcode:string
  proofofaddress:string
  idphoto:string
  ambassadorranking:string
  aliasname:string
  aboutmyself:string

  constructor(public popoverController: PopoverController, private tempStorage:TemporaryStorage, private alert:AlertController, private route:Router, private api: ApiService){}

  // Show Profile options when icon on right of navbar clicked function
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
    this.userID = this.profileinfo[0].userId
    this.userRoleID = this.profileinfo[0].userRoleId
    this.refferalcode = this.profileinfo[0].userRoleId 
    this.proofofaddress = this.profileinfo[0].proofofaddress
    this.idphoto =this.profileinfo[0].idphoto
    this.ambassadorranking= this.profileinfo[0].ambassadorranking
    this.aliasname=this.profileinfo[0].aliasname
    this.aboutmyself=this.profileinfo[0].aboutmyself

  console.log(this.profileinfo[0])
  }

  close()
  {
   
    this.popoverController.dismiss();
  }

  //Are you sure 
  async confirm() {
    const alert = await this.alert.create({
      header: 'Delete',
      message: 'Are you sure?',
      buttons: [{text: 'Yes', handler: ()=> {
        //this.tempStorage.clearRegistrationInfo()
        //clear session + delete user
        let deleteUser:DeleteUserVM = new DeleteUserVM(this.profileinfo[0].userId)
        this.api.deleteUser(deleteUser).subscribe(result=> {
        if(result == true){
        this.tempStorage.logout()
        this.close()
        this.route.navigate(['home'])
        console.log("done")
        }
        else{
          console.log(result)
        }
      })
 
      }},{text: "No", handler: ()=>
      this.close()
    }]
    });

    await alert.present();
  }


  //delete user
  Delete(){
    this.confirm()
    console.log(this.profileinfo[0].userId)
  }
}
