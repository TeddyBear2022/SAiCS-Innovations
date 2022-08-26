import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
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
  profilereginfo:registerationinfoVM 
  userRoleID:number
  refferralCode:string

  //Data from form to delete or update
  form:FormGroup
  AdminUserForm:FormGroup
  
  constructor(public popoverController: PopoverController, 
    private tempStorage:TemporaryStorage, 
    private alert:AlertController, 
    private route:Router, 
    private api: ApiService, 
    private menu:MenuController)
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
    this.userRoleID = this.profileinfo[0].userRoleId

    //Set menu
    if(this.userRoleID == 1){
      this.menu.enable(true, 'client-menu');
    }
    if(this.userRoleID == 2){
      this.menu.enable(true, 'ambassador-menu');
    }
    if(this.userRoleID == 3){
      this.menu.enable(true, 'admin-menu');
    }
    
    //Ambassador or Client user form
    this.form = new FormGroup({
      titleForm: new FormControl(this.profileinfo[0].title.titleName),
      nameForm: new FormControl(this.profileinfo[0].name),
      surnameForm: new FormControl(this.profileinfo[0].surname),
      emailaddressForm: new FormControl(this.profileinfo[0].email),
      phonenumberForm: new FormControl('+27'+this.profileinfo[0].phoneNumber),
      usernameForm: new FormControl(this.profileinfo[0].userName),
      countryForm: new FormControl(this.profileinfo[0].addresses[0].country.countryName),
      provinceForm: new FormControl(this.profileinfo[0].addresses[0].province.provinceName),
      cityForm: new FormControl(this.profileinfo[0].addresses[0].city),
      addressForm: new FormControl(this.profileinfo[0].addresses[0].address1),
      postalForm: new FormControl(this.profileinfo[0].addresses[0].postalCode),
    })
    

    //Admin user form
    this.AdminUserForm = new FormGroup({
      titleForm: new FormControl(this.profileinfo[0].title.titleName),
      nameForm: new FormControl(this.profileinfo[0].name),
      surnameForm: new FormControl(this.profileinfo[0].surname),
      emailaddressForm: new FormControl(this.profileinfo[0].email),
      phonenumberForm: new FormControl('+27'+this.profileinfo[0].phoneNumber),
      usernameForm: new FormControl(this.profileinfo[0].userName),
      countryForm: new FormControl(this.profileinfo[0].addresses[0].country.countryName),
      provinceForm: new FormControl(''),
      cityForm: new FormControl(this.profileinfo[0].addresses[0].city),
      addressForm: new FormControl(this.profileinfo[0].addresses[0].address1),
      postalForm: new FormControl(this.profileinfo[0].addresses[0].postalCode)
      
    })
  
    console.log
    (this.userRoleID)

  }

  close()
  {
   
    this.popoverController.dismiss();
  }

  //Are you sure (Delete)
  async confirmDelete() {
    const alert = await this.alert.create({
      header: 'Delete',
      message: 'Are you sure?',
      buttons: [{text: 'Yes', handler: ()=> {
        //this.tempStorage.clearRegistrationInfo()
        //clear session + delete user
       
        this.api.deleteUser().subscribe(result=> {
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
    this.confirmDelete()
    console.log(this.profileinfo[0].userId)
  }

  //Update User
  Update(){
    this.confirmUpdate()
  }
}
