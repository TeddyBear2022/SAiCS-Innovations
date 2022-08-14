import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { UpdateFaqModalComponent } from 'src/app/Admin/modals/update-faq-modal/update-faq-modal.component';
import { DeleteUserVM } from 'src/app/Models/ViewModels/DeleteUserVM';
import { ProfileVM } from 'src/app/Models/ViewModels/ProfileVM';
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

  //Data from api
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

  //Data from form to delete or update
  form:FormGroup
  
  constructor(public popoverController: PopoverController, 
    private tempStorage:TemporaryStorage, 
    private alert:AlertController, 
    private route:Router, 
    private api: ApiService)
    {
     
    }

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
    console.log(this.profileinfo[0])
    this.name = this.profileinfo[0].name
    this.Surname = this.profileinfo[0].surname
    this.title = this.profileinfo[0].title.titleName
    this.emailaddress = this.profileinfo[0].email
    this.country = this.profileinfo[0].addresses[0].country.countryName
    this.city = this.profileinfo[0].addresses[0].city
    this.address = this.profileinfo[0].addresses[0].address1
    this.postal = this.profileinfo[0].addresses[0].postalCode
    this.phonenumber = this.profileinfo[0].phoneNumber
    this.username = this.profileinfo[0].userName
    this.userID = this.profileinfo[0].userId
    this.userRoleID = this.profileinfo[0].userRoleId
    this.refferalcode = this.profileinfo[0].userRoleId 
    this.proofofaddress = this.profileinfo[0].proofofaddress
    this.idphoto =this.profileinfo[0].idphoto
    this.ambassadorranking= this.profileinfo[0].ambassadorranking
    this.aliasname=this.profileinfo[0].aliasname
    this.aboutmyself=this.profileinfo[0].aboutmyself

    //form
    this.form = new FormGroup({
      titleForm: new FormControl(this.title),
      nameForm: new FormControl(this.name),
      surnameForm: new FormControl(this.Surname),
      emailaddressForm: new FormControl(this.emailaddress),
      phonenumberForm: new FormControl(this.phonenumber),
      usernameForm: new FormControl(this.username),
      countryForm: new FormControl(this.country),
      cityForm: new FormControl(this.city),
      addressForm: new FormControl(this.address),
      postalForm: new FormControl(this.postal)
    })

  }

  close()
  {
   
    this.popoverController.dismiss();
  }

  //Are you sure (Delete)
  async confirm() {
    const alert = await this.alert.create({
      header: 'Delete',
      message: 'Are you sure?',
      buttons: [{text: 'Yes', handler: ()=> {
        //this.tempStorage.clearRegistrationInfo()
        //clear session + delete user
        let deleteUser = this.profileinfo[0].id
        this.api.deleteUser(deleteUser).subscribe(result=> {
        console.log(result)
        if(result == true){
        this.tempStorage.logout()
        this.close()
        this.route.navigate(['home'])
        console.log("deleted user")
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


  //Are you sure (Delete)
  async confirmUpdate() {
    const alert = await this.alert.create({
      header: 'Update',
      message: 'Are you sure?',
      buttons: [{text: 'Yes', handler: ()=> {
        //this.api
        // console.log( this.form.get('addressForm').value);
        let updateUser = new ProfileVM()
        updateUser.Address = this.form.get('addressForm').value
        updateUser.TitleId = this.form.get('titleForm').value
        updateUser.Surname = this.form.get('surnameForm').value
        updateUser.PhoneNumber = this.form.get('phonenumberForm').value
        updateUser.CountryId = 1
        updateUser.PostalCode = this.form.get('postalForm').value
        updateUser.Id= this.profileinfo[0].id
        updateUser.City = this.form.get('cityForm').value
        updateUser.Name = this.form.get('nameForm').value
        // console.log(updateUser);
        this.api.UpdateUser(updateUser).subscribe(data => {
          if(data == true){
            this.alertNotif("Your details were successfully updated! ", "Update")
          }
          else{
            this.alertNotif("Something went wrong, please try again later! ", "Opps!")
          }
          
        })
        
 
      }},{text: "No", handler: ()=>
      this.close()
    }]
    });

    await alert.present();
  }

  //Notfication
  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }


  //delete user
  Delete(){
    this.confirm()
    console.log(this.profileinfo[0].userId)
  }

  Update(){
    this.confirmUpdate()
  }
}
