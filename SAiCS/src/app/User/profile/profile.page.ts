import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { UpdateFaqModalComponent } from 'src/app/Admin/modals/update-faq-modal/update-faq-modal.component';
import { DeleteUserVM } from 'src/app/Models/ViewModels/DeleteUserVM';
import { ProfileVM } from 'src/app/Models/ViewModels/ProfileVM';
import { registerationinfoVM } from 'src/app/Models/ViewModels/registerationinfoVM';
import { registerVM } from 'src/app/Models/ViewModels/registerVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
import { UpdateBankingDetailsPage } from './update-banking-details/update-banking-details.page';


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

  //Data from form to delete or update
  form:FormGroup
  AdminUserForm:FormGroup
  
  constructor(public popoverController: PopoverController, 
    private tempStorage:TemporaryStorage, 
    private alert:AlertController, 
    private route:Router, 
    private api: ApiService, 
    private menu:MenuController, 
    private modal: ModalController)
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
      titleForm: new FormControl(this.profileinfo[0].title.titleId,Validators.required),
      nameForm: new FormControl(this.profileinfo[0].name,Validators.required),
      surnameForm: new FormControl(this.profileinfo[0].surname,Validators.required),
      emailaddressForm: new FormControl(this.profileinfo[0].email,Validators.compose([Validators.required, Validators.email])),
      phonenumberForm: new FormControl(this.profileinfo[0].phoneNumber,Validators.compose([Validators.required, Validators.maxLength(10)])),
      usernameForm: new FormControl(this.profileinfo[0].userName,Validators.required),
      countryForm: new FormControl(this.profileinfo[0].addresses[0].country.countryName,Validators.required),
      provinceForm: new FormControl(this.profileinfo[0].addresses[0].province.provinceId,Validators.required),
      cityForm: new FormControl(this.profileinfo[0].addresses[0].city,Validators.required),
      addressForm: new FormControl(this.profileinfo[0].addresses[0].address1,Validators.required),
      postalForm: new FormControl(this.profileinfo[0].addresses[0].postalCode,Validators.required),
    })
    

    //Admin user form
    // this.AdminUserForm = new FormGroup({
    //   titleForm: new FormControl(this.profileinfo[0].title.titleName),
    //   nameForm: new FormControl(this.profileinfo[0].name),
    //   surnameForm: new FormControl(this.profileinfo[0].surname),
    //   emailaddressForm: new FormControl(this.profileinfo[0].email),
    //   phonenumberForm: new FormControl(this.profileinfo[0].phoneNumber,Validators.compose([Validators.required, Validators.maxLength(10)])),
    //   usernameForm: new FormControl(this.profileinfo[0].userName),
    //   countryForm: new FormControl(this.profileinfo[0].addresses[0].country.countryName),
    //   provinceForm: new FormControl(this.profileinfo[0].addresses[0].province.provinceId),
    //   cityForm: new FormControl(this.profileinfo[0].addresses[0].city),
    //   addressForm: new FormControl(this.profileinfo[0].addresses[0].address1),
    //   postalForm: new FormControl(this.profileinfo[0].addresses[0].postalCode)
      
    // })
  
    console.log
    (this.userRoleID)

  }

  UpdateBankingDetails(){
    this.updateBank()
  }
  async updateBank()
  {
    
   const modals = await this.modal.create({
      component: UpdateBankingDetailsPage, 
      componentProps: {bank: "bank" }

      // id: 'addquizClass',
    });
    modals.onDidDismiss().then((data) => {
      console.log(data.data)
    })
     await modals.present();
  }

  close()
  {
    this.popoverController.dismiss();
  }

  //Are you sure (Delete)
  async confirmDelete() {
    const alert = await this.alert.create({
      header: 'Delete',
      message: 'Are you sure you want to permenantly delete your account?',
      buttons: [{text: 'Yes', handler: ()=> {
        //delete account through api      
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
      message: 'Are you sure you want to update your details?',
      buttons: [{text: 'Yes', handler: ()=> {
          //update user object sent to api
          console.log('Valid continue')
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
          updateUser.ProvinceId = this.form.get('provinceForm').value
  
          console.log(updateUser);
          this.api.UpdateUser(updateUser).subscribe(data => {
            console.log(data)
            this.tempStorage.updateSession(data)
            this.alertNotif("Your details were successfully updated! ", "Update")

          },(response: HttpErrorResponse) => {
            if (response.status === 500){
              this.Errors("Something went wrong, please try again later! ", "Oops!")
              // this.DissmissLoading()
              console.log("Encountered an error")
            }
            if (response.status === 400){
              this.Errors("Something went wrong, please try again later! ", "Oops!")
              // this.DissmissLoading()
              console.log("wrong password an error")
            }
          })
        }
        },{text: "No", handler: ()=>
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
      buttons: [{text: 'OK', handler:()=>{
        window.location.reload()
      }}]
    });

    await alert.present();
  }

  async Errors(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK', handler:()=>{
        //window.location.reload()
      }}]
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
    if(this.form.invalid){
      this.Errors('Please ensure all the details displayed on the screen are filled in', '')
    }
    if(this.form.valid){
      this.confirmUpdate()
    }
   
  }
}
